import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for the Socratic Tutor
const SOCRATIC_TUTOR_SYSTEM_INSTRUCTION = `Bạn là CogniTutor - một AI Socratic Master Tutor chuyên sâu về phương pháp học tư duy bậc cao:
1. "Phenomenon → Concept" (Quy nạp từ hiện tượng thực tế đến khái niệm chính thức)
2. "Concept → Phenomenon" (Diễn dịch, kiểm chứng cơ chế và đào sâu bản chất khái niệm)

NGUYÊN TẮC CỐT LÕI BẮT BUỘC TUÂN THỦ:
1. TRONG CHẾ ĐỘ PHENOMENON → CONCEPT:
   - TUYỆT ĐỐI KHÔNG SPOIL (tiết lộ) tên thuật ngữ khoa học/kỹ thuật chính thức ở các bước 1-5!
   - Không được nói "Đây chính là hiện tượng Bystander Effect" hay "Đó là CAP Theorem".
   - Nhiệm vụ của bạn là dùng câu hỏi Socrates dẫn dắt: hỏi "Tại sao?", "Điều gì dẫn tới điều gì?", "Nếu số lượng tăng lên 100 lần thì sao?", "Động lực nào chi phối?", để người học TỰ KHÁM PHÁ RA QUY LUẬT VÀ CƠ CHẾ.
   - Chỉ đến BƯỚC 6 (Reveal Concept), bạn mới nhiệt liệt chúc mừng phát hiện của người học và công bố tên gọi chính thức, định nghĩa chuẩn mực, nguồn gốc học thuật.

2. TRUY VẾT SAI LẦM (MISTAKE AUTOPSY & COGNITIVE TRAP REGISTRY):
   - Người dùng đặc biệt yêu cầu: "LƯU CẢ NHỮNG LÚC TÔI SAI ĐỂ BIẾT SAU NÀY TÔI NHÌN LẠI SAI Ở ĐÂU MÀ NÉ".
   - Luôn chú ý phát hiện những nhận định sai lầm, trực giác ngây thơ (naive intuition), ngụy biện tư duy (như Tư duy tuyến tính Linear Thinking, Ngộ nhận tương quan thành nhân quả Correlation vs Causation, Thiên kiến kẻ ngoài cuộc, Tối ưu cục bộ Local Minima, Bỏ qua độ trễ trễ pha/feedback delay).
   - Khi phát hiện sai lầm, không chỉ trích thô bạo mà đưa ra TÌNH HUỐNG PHẢN CHỨNG (Counterexample) để người học tự nhận ra mô hình tư duy của họ bị vỡ ở đâu.
   - Yêu cầu người học ghi lại "Nhật ký sai sót": Lỗi gì? Vì sao lúc đó lại nghĩ thế? Counterexample nào bẻ gãy nó? Quy tắc né bẫy lần sau là gì?

3. PHƯƠNG PHÁP FEYNMAN & STRESS TEST:
   - Bước Feynman: Yêu cầu người học giải thích lại cho đứa trẻ 10 tuổi / người không có chuyên môn mà KHÔNG dùng từ chuyên môn phức tạp.
   - Bước Stress Test: Đặt ra kịch bản biên cực đoan (Boundary conditions, Edge cases, Extreme scale) để thử thách độ vững của mô hình tư duy.

4. CROSS-DOMAIN TRANSFER & LIÊN KẾT TRI THỨC (SECOND BRAIN / OBSIDIAN):
   - Luôn kết nối cơ chế đã học sang ít nhất 2-3 lĩnh vực hoàn toàn khác nhau (ví dụ: Vật lý, Sinh học, Kinh tế học, Khoa học máy tính, Tâm lý học, Đời sống hàng ngày).
   - Chuẩn bị dữ liệu định dạng Markdown chuẩn Obsidian với [[wikilinks]], #tags, và phần "Nhật ký khám nghiệm sai lầm" (Mistake Autopsy Vault).

Giọng văn: Sâu sắc, kiên nhẫn, kích thích trí tò mò, tư duy phản biện sắc bén của một giáo sư Socrates thời hiện đại. Dùng tiếng Việt chuẩn xác, tự nhiên, mạch lạc.`;

// API: Socratic Chat Step
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const {
      mode, // 'phenomenon-to-concept' | 'concept-to-phenomenon'
      step, // number 1-11
      stepName,
      history = [],
      userMessage,
      sessionState = {},
    } = req.body;

    if (!userMessage && step === 1 && history.length === 0) {
      // Starting prompt
    }

    const contents = [];

    // Add previous conversation turns
    for (const h of history) {
      contents.push({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }],
      });
    }

    // Context instructions for the current step
    let stepGuidance = `\n[THÔNG TIN NGỮ CẢNH HỆ THỐNG]:
Chế độ học: ${mode === 'phenomenon-to-concept' ? 'Hiện tượng → Khái niệm (Phenomenon → Concept)' : 'Khái niệm → Hiện tượng (Concept → Phenomenon)'}
Bước hiện tại: Bước ${step} - ${stepName}
Dữ liệu phiên hiện tại:
${JSON.stringify(sessionState, null, 2)}
`;

    if (mode === 'phenomenon-to-concept') {
      if (step < 6) {
        stepGuidance += `\nLƯU Ý NGHIÊM NGẶT: ĐANG Ở BƯỚC ${step} (< 6). TUYỆT ĐỐI KHÔNG TIẾT LỘ TÊN THUẬT NGỮ CHÍNH THỨC! Nếu người dùng đoán sai hoặc nói trực giác, hãy đặt câu hỏi gợi ý, đưa phản ví dụ để họ tự quan sát quy luật và cơ chế.`;
      } else if (step === 6) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 6: TIẾT LỘ THUẬT NGỮ CHÍNH THỨC! Hãy chúc mừng người học vì đã tự tìm ra cơ chế, sau đó:
1. Đặt tên chính thức cho khái niệm/hiện tượng khoa học này (Official Terminology & Scientific Name).
2. Đưa ra định nghĩa hàn lâm/chuẩn mực ngắn gọn, súc tích.
3. Liên hệ trực tiếp cơ chế mà người học vừa tự xây dựng với lý thuyết chính thống.`;
      } else if (step === 7) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 7: FEYNMAN TECHNIQUE. Yêu cầu hoặc đánh giá phần giải thích của người học sao cho một đứa trẻ 10 tuổi hoặc người không chuyên cũng hiểu được qua một ẩn dụ đời thường dễ hình dung.`;
      } else if (step === 8) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 8: STRESS TEST. Hãy đưa ra 1-2 kịch bản biên cực đoan (edge cases, extreme values, counter-intuitive scenarios) để kiểm tra xem mô hình tư duy của người học có bị sụp đổ không.`;
      } else if (step === 9) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 9: SỬA MENTAL MODEL & MISTAKE AUTOPSY. Giúp người học nhận diện: Lỗ hổng tư duy nào đã xuất hiện khi gặp Stress Test? Tư duy ngây thơ ban đầu là gì? Khám nghiệm sai lầm và đúc kết Heuristic để lần sau không bao giờ mắc bẫy này nữa.`;
      } else if (step === 10) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 10: CROSS-DOMAIN TRANSFER. Hãy cùng người học chuyển giao cơ chế này sang 2-3 lĩnh vực hoàn toàn khác (ví dụ: Phần mềm, Sinh học, Kinh tế học, Tâm lý tổ chức).`;
      } else if (step === 11) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 11: LƯU SECOND BRAIN / OBSIDIAN. Tổng kết toàn diện và chuẩn bị cấu trúc Markdown với [[wikilinks]] và Mistake Vault.`;
      }
    } else {
      // Concept to Phenomenon mode
      if (step === 1) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 1: GIỚI THIỆU KHÁI NIỆM & ĐẶT VẤN ĐỀ. Nhắc lại khái niệm mà người học muốn nghiên cứu, gợi mở bản chất cốt lõi.`;
      } else if (step === 2) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 2: CÁC VÍ DỤ / HIỆN TƯỢNG ĐA CHIỀU (Examples). Cung cấp 2-3 kịch bản/hiện tượng thực tế sinh động thể hiện khái niệm này để người học quan sát.`;
      } else if (step === 3) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 3: TỰ TÌM PATTERN. Yêu cầu người học quan sát các ví dụ và chỉ ra mẫu số chung (pattern) xuyên suốt là gì.`;
      } else if (step === 4) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 4: TỰ XÂY DỰNG CƠ CHẾ / MENTAL MODEL. Thúc đẩy người học diễn giải cơ chế vận hành bên dưới: bánh răng nào quay bánh răng nào?`;
      } else if (step === 5) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 5: FEYNMAN EXPLANATION. Yêu cầu người học giải thích bằng phép ẩn dụ đời thường cho người không chuyên.`;
      } else if (step === 6) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 6: AI HỎI SÂU SOCRATES (Why / How / What if / Counterexample). Đặt câu hỏi chất vấn sâu sắc để tìm vết nứt trong tư duy người học.`;
      } else if (step === 7) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 7: PHÁT HIỆN LỖ HỔNG (Flaw Detection). Chỉ ra hoặc hướng dẫn người học tự thấy lỗ hổng tư duy và những điểm còn mơ hồ.`;
      } else if (step === 8) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 8: SỬA MENTAL MODEL & LƯU NHẬT KÝ SAI SÓT (Mistake Log). Giúp người học vá lỗ hổng và ghi chép lại sai lầm cụ thể để sau này né.`;
      } else if (step === 9) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 9: CROSS-DOMAIN EXAMPLES & DETECT CONNECTION. Cho người học tự nhận diện sự kết nối của mô hình này trong các lĩnh vực xa lạ khác.`;
      } else if (step === 10) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 10: DELAYED TRANSFER TEST. Đưa ra một bài toán áp dụng hoàn toàn mới tinh để kiểm tra khả năng chuyển giao thực sự.`;
      } else if (step === 11) {
        stepGuidance += `\nĐÂY LÀ BƯỚC 11: LƯU SECOND BRAIN / OBSIDIAN. Định dạng ghi chú dạng liên kết tri thức, đính kèm đồ thị liên kết và nhật ký sai sót.`;
      }
    }

    const currentPrompt = `${userMessage || 'Xin chào, hãy bắt đầu dẫn dắt tôi bước này.'}\n\n${stepGuidance}`;

    contents.push({
      role: 'user',
      parts: [{ text: currentPrompt }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SOCRATIC_TUTOR_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || '';

    res.json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Error calling Gemini in /api/tutor/chat:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Lỗi khi kết nối với Gemini AI Tutor',
    });
  }
});

// API: Generate Obsidian Note (.md) with Frontmatter, Wikilinks, Mermaid Diagram, and Mistake Autopsy
app.post('/api/tutor/generate-obsidian', async (req, res) => {
  try {
    const { sessionData, mode } = req.body;

    const prompt = `Dựa vào toàn bộ dữ liệu phiên học Socratic sau đây, hãy tạo ra MỘT FILE GHI CHÚ OBSIDIAN MARKDOWN (.md) HOÀN CHỈNH, CHUYÊN NGHIỆP, CHUẨN SECOND BRAIN.

DỮ LIỆU PHIÊN HỌC:
- Chế độ: ${mode}
- Hiện tượng / Vấn đề: ${sessionData.phenomenon || sessionData.concept || 'Chưa đặt tên'}
- Thuật ngữ chính thức: ${sessionData.officialConcept || 'Chưa tiết lộ'}
- Lĩnh vực: ${sessionData.domain || 'Đa ngành (Cross-domain)'}
- Giải thích ngôn ngữ đời thường: ${sessionData.userExplanation || 'N/A'}
- Pattern phát hiện: ${sessionData.patterns || 'N/A'}
- Cơ chế Mental Model: ${sessionData.mechanism || 'N/A'}
- Phép ẩn dụ Feynman: ${sessionData.feynmanExplanation || 'N/A'}
- Kết quả Stress Test: ${sessionData.stressTestAnswer || 'N/A'}
- Danh sách sai lầm đã phát hiện (Mistakes Log): ${JSON.stringify(sessionData.mistakes || [], null, 2)}
- Mental Model đã sửa: ${sessionData.repairedModel || 'N/A'}
- Liên kết chéo đa ngành (Cross-domain): ${JSON.stringify(sessionData.crossDomainConnections || [], null, 2)}

YÊU CẦU CẤU TRÚC FILE OBSIDIAN:
1. YAML Frontmatter:
   ---
   title: "Tên khái niệm"
   aliases: ["tên phụ", "tên tiếng Anh"]
   tags: ["second-brain", "mental-models", "domain-tags", "mistake-autopsy"]
   created: "${new Date().toISOString().split('T')[0]}"
   type: "permanent-note"
   status: "verified-mental-model"
   ---
2. # [[Tên khái niệm chính thức]] (hoặc Hiện tượng nếu chưa có)
3. ## 1. 🔍 Hiện tượng thực tế & Trực giác đời thường (Phenomenon & Layman Intuition)
4. ## 2. 🧩 Quy luật lặp lại & Cơ chế cốt lõi (Discovered Pattern & Underlying Mechanism)
   - Kèm 1 biểu đồ Mermaid (graph TD hoặc flow TD) mô tả luồng nhân quả.
5. ## 3. 🎓 Khái niệm & Thuật ngữ học thuật chính thức (Formal Academic Definition)
6. ## 4. 👶 Phép ẩn dụ Feynman (Explain like I'm 10)
7. ## 5. ⚡ Điều kiện biên & Stress Test (Boundary Limits & Extreme Cases)
8. ## 6. 🚨 KHÁM NGHIỆM SAI LẦM & BẪY TƯ DUY ĐÃ TỪNG MẮC (MISTAKE AUTOPSY & COGNITIVE TRAPS VAULT)
   - BẮT BUỘC RẤT CHI TIẾT:
     * ❌ Trực giác ngây thơ/Sai lầm ban đầu tôi đã nghĩ: ...
     * ❓ Vì sao lúc đó tôi lại nghĩ thế? (Nguyên nhân tâm lý/nhận thức)
     * 💥 Phản ví dụ (Counterexample) đã bẻ gãy suy nghĩ cũ: ...
     * ⚠️ Tên bẫy tư duy (Linear Thinking, Single-cause fallacy, v.v.): ...
     * 🛡️ Heuristics & Quy tắc ghi nhớ để lần sau NHÌN LÀ NÉ: ...
9. ## 7. 🌐 Mạng lưới liên kết đa ngành (Cross-Domain Bi-directional Links)
   - Tạo ít nhất 3-4 liên kết dạng [[Tên Khái Niệm Khác]] kèm lời giải thích ngắn về sự tương đồng cơ chế.
10. ## 8. 🔗 Dataview Query & Backlinks gợi ý cho Obsidian

Trả về trực tiếp nội dung Markdown chuẩn, không thêm giải thích ngoài lề.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: 'Bạn là chuyên gia thiết kế hệ thống Second Brain và Obsidian Zettelkasten bậc thầy. Xuất ra tài liệu Markdown nguyên bản, sắc bén, định dạng chuẩn xác.',
        temperature: 0.4,
      },
    });

    res.json({
      success: true,
      markdown: response.text || '',
    });
  } catch (error: any) {
    console.error('Error generating Obsidian note:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Lỗi khi tạo ghi chú Obsidian',
    });
  }
});

// API: Diagnose Mistake & Cognitive Bias
app.post('/api/tutor/diagnose-mistake', async (req, res) => {
  try {
    const { userStatement, context, expectedInsight } = req.body;

    const prompt = `Phân tích câu trả lời hoặc suy nghĩ của người học sau đây để làm "Khám nghiệm sai sót tư duy" (Mistake Autopsy):
Ngữ cảnh bài toán: ${context}
Người học đã phát biểu/suy luận: "${userStatement}"
Bản chất đúng cần đạt: ${expectedInsight}

Hãy phân tích và trả về định dạng JSON thuần túy (không bọc markdown block) gồm các trường:
{
  "naiveBelief": "Quan niệm trực giác ngây thơ hoặc giả định ngầm sai lầm",
  "psychologicalReason": "Tại sao bộ não con người lại có xu hướng nghĩ như vậy một cách tự nhiên",
  "counterexample": "Một phản ví dụ hoặc tình huống cực đoan làm sụp đổ ngay suy nghĩ trên",
  "cognitiveTrapName": "Tên bẫy nhận thức cụ thể (ví dụ: Linear Extrapolation, Correlation as Causation, Local Optimization, Single Cause Fallacy...)",
  "correction": "Cách hiệu chỉnh lại mô hình tư duy chính xác",
  "heuristicRule": "Một câu thần chú/quy tắc ngón tay cái ngắn gọn để lần sau gặp lại là né ngay"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    let resultJson = {};
    try {
      resultJson = JSON.parse(response.text || '{}');
    } catch {
      resultJson = { raw: response.text };
    }

    res.json({
      success: true,
      data: resultJson,
    });
  } catch (error: any) {
    console.error('Error in /api/tutor/diagnose-mistake:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Lỗi khi phân tích sai lầm',
    });
  }
});

// API: Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Vite middleware or static serving
if (!isProd) {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[CogniTutor Server] Running on http://0.0.0.0:${PORT}`);
});
