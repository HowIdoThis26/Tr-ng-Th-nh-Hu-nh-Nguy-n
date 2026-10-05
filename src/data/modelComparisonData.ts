import { AIModelProfile, ModelComparisonCriteria } from '../types/tutor';

export const COMPARISON_CRITERIA: ModelComparisonCriteria[] = [
  {
    id: 'socratic-discipline',
    name: 'Kỷ luật Socratic & Chống Spoil thuật ngữ',
    description: 'Khả năng kiềm chế không đưa ra đáp án/tên thuật ngữ quá sớm; liên tục đặt câu hỏi gợi mở để người học tự tư duy bóc tách.',
    weight: 20
  },
  {
    id: 'pipeline-scaffolding',
    name: 'Điều phối Pipeline 11 bước (Scaffolding)',
    description: 'Theo dõi tiến trình nhận thức nhiều giai đoạn, giữ vững ngữ cảnh từ Hiện tượng -> Trực giác -> Cơ chế -> Feynman -> Stress test -> Chuyển giao.',
    weight: 15
  },
  {
    id: 'mistake-autopsy',
    name: 'Khám nghiệm Sai lầm (Mistake Autopsy Vault)',
    description: 'Phát hiện trực giác ngây thơ, bóc tách nguyên nhân tâm lý, đưa phản ví dụ bẻ gãy sai lầm và đúc kết quy tắc Heuristic để lần sau né.',
    weight: 20
  },
  {
    id: 'obsidian-integration',
    name: 'Tích hợp Obsidian & Second Brain',
    description: 'Xuất Markdown chuẩn Zettelkasten, YAML frontmatter, [[wikilinks]] hai chiều, bảng biểu, biểu đồ Mermaid và cú pháp Dataview.',
    weight: 15
  },
  {
    id: 'cross-domain-transfer',
    name: 'Tư duy liên ngành (Cross-Domain Transfer)',
    description: 'Khả năng bóc tách cơ chế cốt lõi và tìm kiếm các hiện tượng tương đồng trong Sinh học, Máy tính, Kinh tế, Xã hội học.',
    weight: 15
  },
  {
    id: 'memory-knowledge-graph',
    name: 'Ghi nhớ dài hạn & Đồ thị tri thức (Graph Linking)',
    description: 'Kết nối bài học hôm nay với các bài học trước, phát hiện mâu thuẫn giữa các mô hình tư duy cũ và mới.',
    weight: 15
  }
];

export const AI_MODELS_DATA: AIModelProfile[] = [
  {
    id: 'gemini',
    name: 'Google Gemini (Flash / Pro / Ultra)',
    company: 'Google DeepMind',
    coreStrengths: [
      'Ngữ cảnh khổng lồ 1M - 2M tokens giúp lưu giữ toàn bộ lịch sử tư duy và các phiên học trước đó mà không bao giờ bị quên.',
      'Tốc độ phản hồi cực nhanh (Gemini 3.8 Flash), rất thích hợp cho đối thoại Socrates liên tục không bị ngắt quãng tư duy.',
      'Khả năng đa phương thức tự nhiên (nhận diện hình ảnh sơ đồ, biểu đồ hiện tượng thực tế, video mô phỏng thí nghiệm).',
      'Tích hợp hoàn hảo với hệ sinh thái Google (Search Grounding thời gian thực, Workspace, Colab).'
    ],
    weaknesses: [
      'Đôi khi có xu hướng trả lời quá đầy đủ và hào phóng, nếu không có System Prompt siết chặt kỷ luật thì dễ vô tình "spoil" thuật ngữ trước bước 6.',
      'Tính năng Projects/Artifacts chưa tách bạch và tiện thao tác so khớp như Claude Artifacts.'
    ],
    scores: {
      'socratic-discipline': 8.8,
      'pipeline-scaffolding': 9.2,
      'mistake-autopsy': 9.0,
      'obsidian-integration': 9.1,
      'cross-domain-transfer': 9.5,
      'memory-knowledge-graph': 9.6
    },
    socraticFidelityVerdict: 'Rất xuất sắc khi có prompt hướng dẫn ranh giới. Cửa sổ ngữ cảnh 1M-2M tokens cho phép nạp toàn bộ ghi chú Second Brain của bạn vào làm nền tảng đối thoại.',
    mistakeTrackingCapability: 'Xuất sắc: Nhận diện sắc bén các thiên kiến nhận thức (Cognitive Biases) và tổng hợp bảng phân tích sai sót dạng JSON/Markdown có cấu trúc chặt chẽ.',
    obsidianIntegrationScore: 'Rất cao: Tạo Markdown chuẩn xác, hỗ trợ sinh cú pháp Mermaid diagram, Dataview queries và YAML tags cực mượt.',
    verdictForThisMethod: 'LỰA CHỌN TỐI ƯU CHO ENGINE TRUNG TÂM: Tốc độ phản hồi tức thì cho đối thoại Socrates + Ngữ cảnh 1M-2M token nuốt trọn toàn bộ Vault ghi chú để liên kết tri thức.',
    idealRoleInPipeline: 'Socratic Tutor thời gian thực, Điều phối 11 bước, Đối thoại đa phương thức và Chuyển giao liên ngành.',
    recommendedWorkflow: 'Dùng Gemini 3.8 Flash làm Agent Tutor chính trên app CogniTutor -> Kết hợp với công cụ xuất Markdown đồng bộ thẳng vào thư mục Obsidian Vault.'
  },
  {
    id: 'notebooklm',
    name: 'Google NotebookLM',
    company: 'Google Labs',
    coreStrengths: [
      'Source-Grounded 100%: Hoàn toàn bám sát vào tài liệu bạn cung cấp (giáo trình PDF, bài nghiên cứu, ghi chú Obsidian cũ), không bị ảo giác bịa đặt.',
      'Audio Overview (Deep Dive Podcast): Tính năng 2 AI host tranh luận bằng giọng nói cực kỳ sống động, biến các mô hình tư duy và các lỗi sai của bạn thành một tập podcast radio.',
      'Tổ chức ghi chú dạng Note Studio trực quan, trích dẫn nguồn (citation) chính xác đến từng trang/dòng.'
    ],
    weaknesses: [
      'Không phải là một Chatbot đàm thoại tự do: NotebookLM được thiết kế như một trợ lý tra cứu tài liệu hơn là một Socratic Agent biết giả vờ không biết để chất vấn bạn.',
      'Khó ép NotebookLM tuân thủ quy trình 11 bước chặt chẽ nếu tài liệu nguồn đã ghi sẵn tên thuật ngữ (nó sẽ trích dẫn ra ngay vì bản chất là source-grounded).'
    ],
    scores: {
      'socratic-discipline': 6.5,
      'pipeline-scaffolding': 7.0,
      'mistake-autopsy': 8.5,
      'obsidian-integration': 8.8,
      'cross-domain-transfer': 8.0,
      'memory-knowledge-graph': 9.0
    },
    socraticFidelityVerdict: 'Trung bình đối với việc giấu thuật ngữ: Vì nó ưu tiên trả lời chính xác dựa trên nguồn tài liệu, nên nếu nguồn có từ đó nó sẽ trích dẫn ra ngay.',
    mistakeTrackingCapability: 'Tuyệt vời ở khâu LƯU TRỮ & TÁI HIỆN: Nạp toàn bộ file "Sổ tay sai lầm" (Mistake Vault) vào NotebookLM, nó sẽ giúp bạn tạo Audio Podcast thảo luận về những sai lầm thường gặp của bạn!',
    obsidianIntegrationScore: 'Rất tốt: Có thể export các ghi chú từ Obsidian Vault vào NotebookLM thành các Source để nghiên cứu sâu.',
    verdictForThisMethod: 'VŨ KHÍ BỔ TRỢ HÙNG MẠNH: Dùng để làm "Thư viện nguồn" (Grounding Source) và tạo Audio Podcast ôn tập các bẫy tư duy khi đang tập thể dục hoặc lái xe!',
    idealRoleInPipeline: 'Knowledge Grounding Engine & Audio Reviewer: Nạp các file ghi chú Obsidian vào đây để sinh Audio Deep Dive mổ xẻ những sai lầm bạn hay mắc.',
    recommendedWorkflow: 'Sau khi lưu các file `.md` vào Obsidian, đồng bộ thư mục đó vào NotebookLM -> Bấm "Generate Audio Overview" để nghe 2 chuyên gia AI thảo luận về cách bạn đã vượt qua các bẫy tư duy.'
  },
  {
    id: 'chatgpt',
    name: 'OpenAI ChatGPT (GPT-4o / o1 / o3-mini)',
    company: 'OpenAI',
    coreStrengths: [
      'Mô hình o1 / o3-mini có khả năng suy luận sâu (Chain-of-Thought) cực mạnh, giải các bài toán Stress Test logic cực kỳ hiểm hóc.',
      'Giao diện Canvas cho phép chỉnh sửa văn bản và ghi chú trực tiếp hai chiều.',
      'Tính năng Memory (Bộ nhớ dài hạn) tự động ghi nhớ thói quen và các sai lầm mà người dùng từng chia sẻ qua các phiên chat.',
      'Hệ sinh thái Custom GPTs phong phú.'
    ],
    weaknesses: [
      'GPT-4o thường có phong cách "nịnh người dùng" và thích đưa ra câu trả lời đầy đủ ngay lập tức hơn là kiên nhẫn hỏi dồn như Socrates.',
      'Mô hình o1 có độ trễ suy luận (Thinking latency 5-20s), làm gián đoạn nhịp đối thoại Socrates qua lại nhanh.',
      'Cửa sổ ngữ cảnh nhỏ hơn đáng kể so với Gemini (128k vs 1M-2M), khó nuốt trọn cả một Vault Obsidian lớn.'
    ],
    scores: {
      'socratic-discipline': 8.2,
      'pipeline-scaffolding': 8.7,
      'mistake-autopsy': 8.9,
      'obsidian-integration': 8.6,
      'cross-domain-transfer': 9.1,
      'memory-knowledge-graph': 8.4
    },
    socraticFidelityVerdict: 'Tốt nhưng cần Custom GPT chuyên dụng để ngăn chặn thói quen giải thích tuôn trào của mô hình.',
    mistakeTrackingCapability: 'Rất tốt nhờ tính năng Memory tự động cập nhật "User tends to make linear thinking assumptions in dynamic systems".',
    obsidianIntegrationScore: 'Tốt: Xuất markdown mượt mà, nhưng cần copy-paste thủ công qua Canvas.',
    verdictForThisMethod: 'ĐỐI THỦ STRESS TEST THƯỢNG HẠNG: Dùng mô hình o1/o3-mini ở Bước 8 (Stress Test) và Bước 10 (Delayed Transfer Test) để tạo ra các bài toán biên siêu thử thách.',
    idealRoleInPipeline: 'Stress Tester & Deep Reasoner: Dùng o1 cho các câu hỏi kiểm tra độ vững chắc của Mental Model ở mức độ Olympic/chuyên gia.',
    recommendedWorkflow: 'Sử dụng một Custom GPT với system prompt chặt chẽ, hoặc dùng Canvas để vừa chat vừa sửa ghi chú Second Brain.'
  },
  {
    id: 'claude',
    name: 'Anthropic Claude (Claude 3.5 / 3.7 Sonnet)',
    company: 'Anthropic',
    coreStrengths: [
      'Khả năng sư phạm (Pedagogical nuance) tinh tế nhất hiện nay: Giọng văn trầm tĩnh, tự nhiên, khiêm nhường và bám sát nguyên tắc Socrates rất tốt.',
      'Claude Artifacts hiển thị tài liệu, sơ đồ tương tác hoặc React component ngay bên cạnh cửa sổ chat.',
      'Tính năng Extended Thinking (Suy nghĩ mở rộng) giúp bóc tách các mâu thuẫn ngầm trong lập luận của người học một cách phẫu thuật.',
      'Khả năng viết Markdown, cấu trúc tài liệu Zettelkasten và phân loại đa tầng cực kỳ trang nhã.'
    ],
    weaknesses: [
      'Không có bộ nhớ dài hạn tự động xuyên suốt giữa các Project (bị giới hạn trong phạm vi từng phiên hoặc Project Knowledge).',
      'Giới hạn lượt dùng (Rate limits) khá nghiêm ngặt trên bản web miễn phí hoặc Pro.',
      'Không tích hợp sâu sẵn với các công cụ Google như Search hay NotebookLM.'
    ],
    scores: {
      'socratic-discipline': 9.5,
      'pipeline-scaffolding': 9.3,
      'mistake-autopsy': 9.4,
      'obsidian-integration': 9.4,
      'cross-domain-transfer': 9.4,
      'memory-knowledge-graph': 8.5
    },
    socraticFidelityVerdict: 'ĐỈNH CAO VỀ PHONG CÁCH SOCRATES: Claude tuân thủ hướng dẫn "không spoil thuật ngữ" tốt nhất trong tất cả các mô hình, đặt câu hỏi cực kỳ khéo léo.',
    mistakeTrackingCapability: 'Tuyệt hảo: Phân tích cực kỳ sâu sắc về mặt tâm lý nhận thức tại sao người học lại có suy nghĩ sai lầm đó, phân biệt rạch ròi giữa ngụy biện và thiếu dữ kiện.',
    obsidianIntegrationScore: 'Rất cao: Artifacts cho phép render trực tiếp file Markdown hoàn chỉnh với nút Copy 1-click.',
    verdictForThisMethod: 'ĐỐI TÁC ĐÀO SÂU TƯ DUY XUẤT SẮC NHẤT VỀ CHẤT GIỌNG: Giúp người học tự nhận ra chân lý mà không hề cảm thấy bị áp đặt.',
    idealRoleInPipeline: 'Socratic Dialogue Master & Mistake Autopsy Analyst: Đóng vai người thầy Socrates kiên nhẫn và sâu sắc.',
    recommendedWorkflow: 'Tạo một Claude Project mang tên "Second Brain Socratic Lab", nạp các quy tắc 11 bước vào System Instruction và dùng Artifacts để quản lý ghi chú.'
  }
];

export const HYBRID_WORKFLOW_BLUEPRINT = {
  title: 'Cỗ Máy Học Tập Tối Thượng: Kết hợp Đa Hệ Sinh Thái (Gemini + NotebookLM + Obsidian + Claude/ChatGPT)',
  summary: 'Thay vì dùng đơn lẻ một công cụ, bạn có thể kết hợp sức mạnh đặc thù của từng nền tảng để tạo nên một hệ sinh thái học tập siêu phàm:',
  steps: [
    {
      step: 'GIAI ĐOẠN 1: ĐỐI THOẠI SOCRATES & PHÁT HIỆN CƠ CHẾ (TẠI COGNITUTOR / GEMINI)',
      tool: 'CogniTutor (Gemini 3.8 Flash Engine)',
      action: 'Thực hiện 7 bước đầu: Trực giác đời thường -> Socratic inquiry -> Tự tìm pattern -> Tự dựng cơ chế -> Khám phá thuật ngữ -> Feynman. Nhờ tốc độ tức thì và chi phí tối ưu, bạn không bị gián đoạn dòng suy nghĩ.'
    },
    {
      step: 'GIAI ĐOẠN 2: THỬ THÁCH BIÊN CỰC HẠN & KHÁM NGHIỆM SAI LẦM',
      tool: 'Claude 3.5/3.7 Sonnet hoặc OpenAI o1',
      action: 'Thực hiện Bước 8 & 9 (Stress Test & Mistake Autopsy): Yêu cầu AI đưa ra phản ví dụ bẻ gãy mô hình tư duy, mổ xẻ bẫy nhận thức và sinh ra quy tắc Heuristic né bẫy.'
    },
    {
      step: 'GIAI ĐOẠN 3: LƯU TRỮ VĨNH CỬU & MẠNG LƯỚI TRI THỨC (SECOND BRAIN)',
      tool: 'Obsidian Vault',
      action: 'Tải file `.md` chuẩn từ CogniTutor về thư mục Obsidian của bạn. Sử dụng [[wikilinks]] để liên kết với các khái niệm khác, và plugin Dataview để tự động tổng hợp bảng "Sổ tay các sai lầm cần né".'
    },
    {
      step: 'GIAI ĐOẠN 4: THẨM THẤU THỤ ĐỘNG & NGHE AUDIO DEEP DIVE KHI DI CHUYỂN',
      tool: 'Google NotebookLM',
      action: 'Nạp toàn bộ thư mục ghi chú và sổ tay sai sót từ Obsidian vào NotebookLM. Bấm tạo "Audio Overview" để nghe 2 MC AI thảo luận về các bài học và các bẫy tư duy của bạn như một chương trình podcast hấp dẫn!'
    }
  ]
};

export const OBSIDIAN_SETUP_GUIDE = {
  recommendedPlugins: [
    {
      name: 'Dataview',
      purpose: 'Tự động tạo bảng tra cứu tất cả các bẫy sai lầm (#mistake-autopsy) đã ghi chép để ôn tập mỗi tuần.',
      snippet: `\`\`\`dataview
TABLE 
  cognitiveTrapName as "Bẫy tư duy",
  heuristicRule as "Thần chú né bẫy",
  domain as "Lĩnh vực"
FROM #mistake-autopsy
SORT created desc
\`\`\``
    },
    {
      name: 'Templater',
      purpose: 'Tự động áp dụng khung 11 bước Phenomenon ↔ Concept cho bất kỳ bài học mới nào trong Obsidian.',
      snippet: `---
title: "<% tp.file.title %>"
tags: ["second-brain", "mental-models", "mistake-autopsy"]
created: "<% tp.file.creation_date('YYYY-MM-DD') %>"
status: "in-progress"
---`
    },
    {
      name: 'Obsidian Canvas / Graph View',
      purpose: 'Xem trực quan mối liên kết giữa các khái niệm và các nốt sai sót bằng đồ thị 2 chiều sinh động.'
    }
  ]
};
