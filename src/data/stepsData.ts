import { StepDefinition, TutorMode } from '../types/tutor';

export const PHENOMENON_TO_CONCEPT_STEPS: StepDefinition[] = [
  {
    stepNumber: 1,
    id: 'phenomenon',
    title: 'Hiện tượng / Vấn đề thực tế',
    shortDesc: 'Nêu hiện tượng đời sống hoặc bài toán bí ẩn',
    instructionPrompt: 'Hãy mô tả hiện tượng, sự việc hoặc bài toán thực tế mà bạn quan sát được nhưng chưa biết (hoặc giả sử chưa biết) thuật ngữ khoa học gọi tên nó là gì.',
    badgeText: 'Bước 1: Phenomenon/Problem',
    roleHint: 'Khởi đầu từ thế giới thực tế, không dùng thuật ngữ học thuật'
  },
  {
    stepNumber: 2,
    id: 'layman_explanation',
    title: 'Giải thích bằng ngôn ngữ đời thường',
    shortDesc: 'Diễn giải trực giác ban đầu bằng lời mộc mạc',
    instructionPrompt: 'Hãy dùng từ ngữ mộc mạc, bình dân nhất hàng ngày để giải thích: Theo trực giác của bạn, điều gì đang diễn ra ở hiện tượng đó? Vì sao nó lại xảy ra như vậy?',
    badgeText: 'Bước 2: Layman Intuition',
    roleHint: 'Đừng sợ sai! Trực giác ban đầu là chất liệu quý giá nhất để phân tích mô hình tư duy'
  },
  {
    stepNumber: 3,
    id: 'socratic_inquiry',
    title: 'AI hỏi sâu Socrates',
    shortDesc: 'Đặt câu hỏi chất vấn bóc tách từng lớp nguyên nhân',
    instructionPrompt: 'AI sẽ đóng vai Socrates: Không đưa ra câu trả lời, mà đặt các câu hỏi truy vấn sâu sắc (Tại sao? Điều gì xảy ra ở mức vi mô? Điều gì tác động lên điều gì?) để bạn suy ngẫm.',
    badgeText: 'Bước 3: Socratic Deep-Dive',
    roleHint: 'AI tuyệt đối giữ bí mật tên thuật ngữ, chỉ khơi gợi bạn tự bóc tách'
  },
  {
    stepNumber: 4,
    id: 'find_pattern',
    title: 'Tôi tự tìm Pattern',
    shortDesc: 'Nhận diện quy luật lặp lại và tính đối xứng',
    instructionPrompt: 'Qua các câu hỏi trên, bạn nhận ra quy luật (pattern) gì đang lặp đi lặp lại ở đây? Có điểm chung hay chu kỳ nào giữa các thành phần không?',
    badgeText: 'Bước 4: Discover Pattern',
    roleHint: 'Tập trung tìm tính quy luật: Khi A tăng thì B biến đổi như thế nào?'
  },
  {
    stepNumber: 5,
    id: 'build_mechanism',
    title: 'Tôi tự xây Mechanism / Mental Model',
    shortDesc: 'Tự vẽ cỗ máy nguyên nhân - hệ quả bên dưới',
    instructionPrompt: 'Hãy tự mình xây dựng "bộ máy cơ chế" (Mental Model): Yếu tố nào là nguyên nhân gốc rễ? Nó truyền động lực qua các khâu trung gian như thế nào để tạo ra kết quả cuối cùng?',
    badgeText: 'Bước 5: Construct Mechanism',
    roleHint: 'Tự mình đóng vai nhà khoa học tạo ra giả thuyết cơ chế'
  },
  {
    stepNumber: 6,
    id: 'reveal_concept',
    title: 'AI reveal Thuật ngữ chính thức & Formal Explanation',
    shortDesc: 'Khám phá tên gọi khoa học chuẩn mực và đối chiếu',
    instructionPrompt: 'Bây giờ AI mới chính thức hé lộ tên gọi khoa học, thuật ngữ quốc tế và định nghĩa hàn lâm của hiện tượng này, đối chiếu với mô hình tư duy bạn vừa tự xây!',
    badgeText: 'Bước 6: Reveal & Formalize',
    roleHint: 'Khoảnh khắc Aha! Đối chiếu trực giác tự nhiên với tri thức chuẩn của nhân loại'
  },
  {
    stepNumber: 7,
    id: 'feynman',
    title: 'Kỹ thuật Feynman',
    shortDesc: 'Giải thích lại cho đứa trẻ 10 tuổi bằng ẩn dụ sinh động',
    instructionPrompt: 'Thử thách Feynman: Hãy giải thích lại khái niệm này cho một đứa trẻ 10 tuổi hoặc một người hoàn toàn không có chuyên môn, bằng một phép ẩn dụ đời thường dễ hiểu nhất, KHÔNG DÙNG TỪ CHUYÊN MÔN!',
    badgeText: 'Bước 7: Feynman Technique',
    roleHint: 'Nếu không giải thích được đơn giản, nghĩa là bạn chưa thực sự hiểu sâu'
  },
  {
    stepNumber: 8,
    id: 'stress_test',
    title: 'Stress Test & Trường hợp biên',
    shortDesc: 'Thử thách mô hình ở các điều kiện cực đoan',
    instructionPrompt: 'AI sẽ đưa ra tình huống biên cực đoan (What if, Edge case, Counter-intuitive scenario). Hãy xem mô hình tư duy của bạn có chịu nổi áp lực này không!',
    badgeText: 'Bước 8: Boundary Stress Test',
    roleHint: 'Mô hình tư duy chỉ thực sự mạnh khi nó biết rõ giới hạn biên của chính nó'
  },
  {
    stepNumber: 9,
    id: 'repair_model',
    title: 'Sửa Mental Model & Lưu Khám Nghiệm Sai Lầm',
    shortDesc: 'Ghi nhận sai sót, bẫy nhận thức và vá lỗ hổng',
    instructionPrompt: 'Lỗ hổng nào vừa bị lộ diện ở Stress Test? Bạn đã có trực giác sai lầm nào lúc đầu? Cùng AI làm "Khám nghiệm sai sót" (Mistake Autopsy) và đúc kết Heuristic để lần sau né!',
    badgeText: 'Bước 9: Repair & Mistake Autopsy',
    roleHint: 'Lưu vết sai lầm: Tài sản quý giá nhất để tránh tái phạm trong tương lai'
  },
  {
    stepNumber: 10,
    id: 'cross_domain',
    title: 'Cross-Domain Transfer',
    shortDesc: 'Chuyển giao cơ chế sang các ngành khoa học khác',
    instructionPrompt: 'Cơ chế này có thể giải thích những hiện tượng nào trong Sinh học, Kinh tế, Lập trình hệ thống, hay Tâm lý con người? Hãy tự liên hệ hoặc cùng AI khám phá!',
    badgeText: 'Bước 10: Cross-Domain Transfer',
    roleHint: 'Đỉnh cao của tư duy: 1 cơ chế áp dụng cho 5 lĩnh vực khác nhau'
  },
  {
    stepNumber: 11,
    id: 'second_brain',
    title: 'Lưu Second Brain & Obsidian Graph',
    shortDesc: 'Xuất ghi chú chuẩn Obsidian Zettelkasten với [[wikilinks]]',
    instructionPrompt: 'Đóng gói toàn bộ phiên học thành một Permanent Note chuẩn Obsidian với YAML frontmatter, biểu đồ Mermaid, liên kết 2 chiều [[wikilinks]] và Kho Bẫy Sai Lầm!',
    badgeText: 'Bước 11: Second Brain Vault',
    roleHint: 'Biến trải nghiệm học thành tài sản tri thức trường tồn trong kho Obsidian của bạn'
  }
];

export const CONCEPT_TO_PHENOMENON_STEPS: StepDefinition[] = [
  {
    stepNumber: 1,
    id: 'concept',
    title: 'Khái niệm ban đầu (Concept)',
    shortDesc: 'Thuật ngữ hoặc định lý bạn đã biết và muốn đào sâu',
    instructionPrompt: 'Hãy nhập tên khái niệm, định lý hoặc thuật ngữ học thuật mà bạn đã nghe/biết nhưng muốn thấu suốt đến tận chân tơ kẽ tóc (Ví dụ: Định lý CAP, Entropy, Sunk Cost Fallacy, Overfitting...).',
    badgeText: 'Bước 1: Concept Stated',
    roleHint: 'Bắt đầu từ cái tên trừu tượng'
  },
  {
    stepNumber: 2,
    id: 'examples',
    title: 'Các ví dụ & Hiện tượng thực tế (Examples)',
    shortDesc: 'Quan sát các kịch bản đời sống đa chiều phản ánh khái niệm',
    instructionPrompt: 'Xem xét 2-3 kịch bản, hiện tượng thực tế sinh động nơi khái niệm này đang âm thầm vận hành.',
    badgeText: 'Bước 2: Concrete Examples',
    roleHint: 'Hạ cánh khái niệm trừu tượng xuống mặt đất thực tế'
  },
  {
    stepNumber: 3,
    id: 'find_pattern',
    title: 'Tôi tự tìm Pattern',
    shortDesc: 'So sánh các ví dụ để bóc tách quy luật xuyên suốt',
    instructionPrompt: 'Điểm chung cốt lõi giữa các kịch bản/ví dụ trên là gì? Bạn nhận diện được pattern quy luật nào lặp lại?',
    badgeText: 'Bước 3: Pattern Extraction',
    roleHint: 'Tự phát hiện mẫu số chung không dựa vào định nghĩa lý thuyết suông'
  },
  {
    stepNumber: 4,
    id: 'build_mechanism',
    title: 'Tôi tự xây Mechanism / Mental Model',
    shortDesc: 'Lắp ráp mô hình cơ chế vận hành bên trong',
    instructionPrompt: 'Hãy tự mình mô tả cơ chế: Bên trong chiếc hộp đen đó, các yếu tố tác động lẫn nhau như thế nào? Bánh răng nào đẩy bánh răng nào?',
    badgeText: 'Bước 4: Mechanism Formulation',
    roleHint: 'Chuyển từ "biết tên" sang "thấu hiểu động lực học bên trong"'
  },
  {
    stepNumber: 5,
    id: 'feynman',
    title: 'Kỹ thuật Feynman',
    shortDesc: 'Giải thích lại bằng ẩn dụ đời thường dễ hiểu',
    instructionPrompt: 'Hãy diễn giải lại khái niệm này bằng một ẩn dụ mộc mạc cho một người không có nền tảng chuyên môn, không dùng thuật ngữ kỹ thuật.',
    badgeText: 'Bước 5: Feynman Explanation',
    roleHint: 'Đơn giản hóa tuyệt đối là thước đo của sự thấu hiểu'
  },
  {
    stepNumber: 6,
    id: 'socratic_challenge',
    title: 'AI hỏi sâu: Why / How / What if / Counterexample',
    shortDesc: 'Chất vấn phản biện tìm vết rạn nứt trong mô hình',
    instructionPrompt: 'AI sẽ tấn công mô hình tư duy của bạn bằng các câu hỏi Why, How, What if và đưa ra phản ví dụ (Counterexample) để kiểm tra độ vững.',
    badgeText: 'Bước 6: Socratic Challenge',
    roleHint: 'Chất vấn để làm lộ ra những giả định ngầm chưa được kiểm chứng'
  },
  {
    stepNumber: 7,
    id: 'flaw_detection',
    title: 'Phát hiện lỗ hổng tư duy (Flaw Detection)',
    shortDesc: 'Bóc tách những điểm mù nhận thức và giả định sai',
    instructionPrompt: 'Qua câu hỏi thách thức, bạn nhận ra mô hình tư duy của mình đang bị hổng ở điểm nào? Điểm mù nào bạn chưa từng để ý tới?',
    badgeText: 'Bước 7: Flaw & Blind Spot Discovery',
    roleHint: 'Dám nhìn thẳng vào vết nứt tư duy là bước ngoặt của sự trưởng thành'
  },
  {
    stepNumber: 8,
    id: 'repair_model',
    title: 'Sửa Mental Model & Lưu Sổ Tay Sai Lầm',
    shortDesc: 'Vá lại mô hình tư duy và ghi nhớ bẫy để né',
    instructionPrompt: 'Hãy hiệu chỉnh lại mô hình tư duy cho chuẩn xác. Đồng thời ghi vào "Sổ Khám Nghiệm Sai Lầm": Tôi đã sai ở đâu? Tại sao lúc đó lại nghĩ vậy? Thần chú né bẫy lần sau là gì?',
    badgeText: 'Bước 8: Model Repair & Mistake Log',
    roleHint: 'Biến sai lầm thành kháng thể tư duy vĩnh viễn'
  },
  {
    stepNumber: 9,
    id: 'cross_domain',
    title: 'Cross-Domain Examples & Tự phát hiện Connection',
    shortDesc: 'Mở rộng liên kết sang các lĩnh vực hoàn toàn xa lạ',
    instructionPrompt: 'Cùng AI khám phá các ví dụ đa ngành và tự phát hiện mối dây liên kết ngầm giữa khái niệm này với các ngành học khác.',
    badgeText: 'Bước 9: Cross-Domain Synergy',
    roleHint: 'Tạo lập mạng lưới liên kết tri thức đa chiều'
  },
  {
    stepNumber: 10,
    id: 'delayed_transfer',
    title: 'Delayed Transfer Test',
    shortDesc: 'Thực chiến với một bài toán mới tinh chưa từng gặp',
    instructionPrompt: 'AI sẽ đưa ra một tình huống thực chiến hoàn toàn mới chưa từng đề cập. Hãy áp dụng mô hình tư duy vừa tôi luyện để giải quyết nó!',
    badgeText: 'Bước 10: Novel Transfer Test',
    roleHint: 'Kiểm tra khả năng chuyển giao tri thức vào thực tiễn'
  },
  {
    stepNumber: 11,
    id: 'second_brain',
    title: 'Lưu Second Brain & Obsidian Graph',
    shortDesc: 'Lưu trữ vĩnh viễn với [[wikilinks]], tags và đồ thị tri thức',
    instructionPrompt: 'Xuất file Markdown chuẩn Obsidian với frontmatter, bi-directional links, và danh mục các bẫy tư duy đã né được để đồng bộ vào Second Brain của bạn.',
    badgeText: 'Bước 11: Obsidian Second Brain',
    roleHint: 'Tích hợp vĩnh viễn vào hệ điều hành tư duy Second Brain'
  }
];
