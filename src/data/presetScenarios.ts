import { SessionData, TutorMode } from '../types/tutor';

export interface PresetScenario {
  id: string;
  mode: TutorMode;
  title: string;
  domain: string;
  tag: string;
  inputPrompt: string; // The phenomenon description or concept name
  overview: string;
  officialConceptSecret?: string; // Revealed only at step 6 for mode 1
  previewInsight: string;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  // Mode: Phenomenon -> Concept
  {
    id: 'phantom-traffic-jam',
    mode: 'phenomenon-to-concept',
    title: 'Bí ẩn kẹt xe ma trên cao tốc',
    domain: 'Giao thông & Vật lý chất lưu',
    tag: '#nonlinear-dynamics',
    inputPrompt: 'Trên đường cao tốc đang đông đúc, không có tai nạn, không có chướng ngại vật nào cả. Bỗng nhiên 1 xe đạp nhẹ phanh một cái rồi chạy tiếp bình thường. Thế nhưng khoảng 10-15 phút sau, tại khúc đường cách đó vài cây số về phía sau, hàng trăm chiếc xe bị kẹt cứng ngắc đứng im tại chỗ cả tiếng đồng hồ. Vì sao lại xảy ra hiện tượng kỳ quặc này?',
    overview: 'Hiện tượng dòng xe tự tắc nghẽn dù không có chướng ngại vật.',
    officialConceptSecret: 'Sóng xung kích ngược chiều / Hiện tượng tắc nghẽn ma (Phantom Traffic Jam / Jamiton / Shockwave in Non-linear Flow)',
    previewInsight: 'Độ trễ phản ứng của con người + dòng xe mật độ cao tạo thành sóng xung kích ngược chiều khuếch đại phi tuyến tính.'
  },
  {
    id: 'bystander-effect',
    mode: 'phenomenon-to-concept',
    title: 'Nghịch lý đám đông vô cảm khi tai nạn',
    domain: 'Tâm lý học xã hội',
    tag: '#social-psychology',
    inputPrompt: 'Một người bị ngã xe chấn thương nặng ở ngã tư đông nghịt người qua lại giữa ban ngày, có hàng trăm người đứng nhìn nhưng gần như không ai chạy lại cứu hoặc gọi cấp cứu. Trong khi đó, nếu nạn nhân ngã trên một con đường vắng chỉ có 1 hoặc 2 người đi ngang qua, thì gần như chắc chắn họ sẽ chạy ngay tới giúp đỡ. Càng đông người nhìn thì cơ hội được cứu lại càng thấp! Vì sao lại nghịch lý như vậy?',
    overview: 'Càng nhiều người chứng kiến thì xác suất hành động cứu giúp càng giảm.',
    officialConceptSecret: 'Hiệu ứng người ngoài cuộc & Sự khuếch tán trách nhiệm (Bystander Effect & Diffusion of Responsibility / Pluralistic Ignorance)',
    previewInsight: 'Khi chia đều trách nhiệm cho N người, chi phí tâm lý của sự không hành động giảm về 0, kết hợp với hiệu ứng bắt chước sự bình thản của người xung quanh.'
  },
  {
    id: 'cascading-metastable-failure',
    mode: 'phenomenon-to-concept',
    title: 'Server không chết vì nghẽn mà chết vì cơ chế tự cứu',
    domain: 'Hệ thống phần mềm phân tán',
    tag: '#distributed-systems',
    inputPrompt: 'Một trang web bán vé hòa nhạc đột ngột có lượng người truy cập tăng gấp 5 lần. Ban đầu server hơi chậm, nhưng chỉ 2 phút sau thì toàn bộ hệ thống sập hoàn toàn và báo lỗi 504. Kỳ lạ nhất là: Quản trị viên đã lập tức chặn 80% người dùng để lượng truy cập giảm xuống mức rất thấp, nhưng hệ thống vẫn tiếp tục chết đơ và không thể tự phục hồi, buộc lòng phải khởi động lại (restart) toàn bộ! Tại sao khi tải đã giảm rồi mà server vẫn không thể sống lại?',
    overview: 'Hiện tượng hệ thống bị rơi vào trạng thái bẫy hỏng hóc siêu ổn định.',
    officialConceptSecret: 'Sự cố sụp đổ dây chuyền siêu ổn định (Metastable Failure State & Retry Storm / Cascading Failure)',
    previewInsight: 'Cơ chế tự thử lại (retry) và dọn dẹp hàng đợi quá hạn biến chính hệ thống thành nguồn tạo tải phá hoại nội tại.'
  },
  {
    id: 'latent-heat-plateau',
    mode: 'phenomenon-to-concept',
    title: 'Bí ẩn nhiệt kế đứng im khi đá tan',
    domain: 'Vật lý nhiệt động lực học',
    tag: '#thermodynamics',
    inputPrompt: 'Ta đặt một cốc nước chứa đầy đá lạnh ở -10°C lên bếp lửa lớn đang cháy rất mạnh. Nhiệt kế chỉ nhiệt độ tăng dần từ -10°C lên 0°C. Nhưng khi vừa chạm tới 0°C, viên đá bắt đầu tan thì cây nhiệt kế đứng im thin thít ở đúng 0°C trong suốt 10 phút liền dù ngọn lửa bên dưới vẫn phì phì truyền nhiệt liên tục! Chỉ sau khi toàn bộ đá tan thành nước hoàn toàn thì nhiệt kế mới lại bắt đầu nhảy vọt lên 1°C, 2°C... Năng lượng khổng lồ từ ngọn lửa trong 10 phút đó đã biến đi đâu mất?',
    overview: 'Hiện tượng nhiệt độ không đổi trong quá trình chuyển trạng thái dù liên tục được cấp nhiệt.',
    officialConceptSecret: 'Nhiệt ẩn chuyển pha (Latent Heat of Fusion & Phase Transition)',
    previewInsight: 'Năng lượng nhiệt được dùng để bẻ gãy cấu trúc mạng tinh thể hydro thay vì làm tăng động năng phân tử.'
  },

  // Mode: Concept -> Phenomenon
  {
    id: 'cap-theorem',
    mode: 'concept-to-phenomenon',
    title: 'Định lý CAP (CAP Theorem)',
    domain: 'Hệ thống phân tán & Cơ sở dữ liệu',
    tag: '#computer-science',
    inputPrompt: 'Định lý CAP (Consistency, Availability, Partition Tolerance)',
    overview: 'Trong một hệ thống mạng phân tán, bạn chỉ có thể chọn tối đa 2 trong 3 đặc tính.',
    previewInsight: 'Khi dây mạng bị đứt (Partition), bạn buộc phải đánh đổi giữa việc trả lời dữ liệu cũ (Availability) hoặc từ chối trả lời để đợi đồng bộ (Consistency).'
  },
  {
    id: 'sunk-cost-fallacy',
    mode: 'concept-to-phenomenon',
    title: 'Hiện tượng chìm chi phí (Sunk Cost Fallacy)',
    domain: 'Kinh tế học hành vi & Tâm lý học',
    tag: '#behavioral-economics',
    inputPrompt: 'Ngụy biện chìm chi phí (Sunk Cost Fallacy) & Bẫy cam kết leo thang',
    overview: 'Khuynh hướng tiếp tục đổ nguồn lực vào một quyết định thua lỗ chỉ vì tiếc những gì đã bỏ ra.',
    previewInsight: 'Chi phí quá khứ là bất biến không thể thu hồi, nhưng tâm lý sợ hối hận và né tránh chấp nhận thất bại khiến ta ra quyết định phi lý trí.'
  },
  {
    id: 'entropy-shannon',
    mode: 'concept-to-phenomenon',
    title: 'Entropy trong Vật lý & Lý thuyết thông tin Shannon',
    domain: 'Vật lý & Khoa học thông tin',
    tag: '#information-theory',
    inputPrompt: 'Khái niệm Entropy (Độ hỗn loạn nhiệt động & Thước đo độ bất định thông tin)',
    overview: 'Từ độ hỗn loạn của hạt vi mô trong nhiệt động học đến độ bất định của thông điệp trong viễn thông.',
    previewInsight: 'Entropy thực chất là thước đo số lượng trạng thái vi mô khả dĩ / lượng bất ngờ (surprise) chứa đựng trong một sự kiện.'
  },
  {
    id: 'homeostasis-feedback',
    mode: 'concept-to-phenomenon',
    title: 'Cân bằng nội môi (Homeostasis & Negative Feedback)',
    domain: 'Sinh lý học & Điều khiển học (Cybernetics)',
    tag: '#systems-thinking',
    inputPrompt: 'Cân bằng nội môi (Homeostasis) và Vòng lặp phản hồi âm (Negative Feedback Loop)',
    overview: 'Cơ chế tự điều chỉnh của mọi hệ thống sinh học và kỹ thuật phức tạp để duy trì ổn định.',
    previewInsight: 'Hệ thống đo lường độ lệch so với điểm chuẩn (setpoint) và kích hoạt tác nhân đối nghịch để kéo về trạng thái cân bằng.'
  }
];

export const INITIAL_DEMO_SESSION: SessionData = {
  id: 'demo-session-phantom-traffic',
  mode: 'phenomenon-to-concept',
  title: 'Bí ẩn kẹt xe ma trên cao tốc (Demo)',
  domain: 'Giao thông & Động lực học phi tuyến',
  currentStep: 6,
  createdAt: '2026-10-04T19:00:00.000Z',
  updatedAt: '2026-10-04T19:25:00.000Z',
  phenomenon: 'Trên đường cao tốc đang đông xe, 1 xe đạp nhẹ phanh rồi đi tiếp. 15 phút sau, tại khúc đường cách đó 3km về phía sau, hàng trăm xe tắc cứng ngắc dù không có va quẹt hay tai nạn nào.',
  userExplanation: 'Tôi nghĩ do xe sau bị bất ngờ nên phanh gấp hơn xe trước, rồi xe sau nữa lại càng phanh gấp hơn, tạo thành một dây chuyền giật cục.',
  patterns: 'Càng về các xe phía sau thì thời gian dừng lại càng lâu hơn, và điểm kẹt dường như không đứng yên mà từ từ trôi ngược về phía sau con đường.',
  mechanism: 'Mỗi tài xế mất khoảng 1 giây phản xạ trước khi đạp phanh. Khi mật độ xe quá dày, khoảng cách không đủ bù đắp thời gian trễ này. Vì thế hiệu ứng phanh bị khuếch đại: xe 1 giảm 5km/h -> xe 2 giảm 15km/h -> xe 5 dừng hẳn 0km/h!',
  officialConcept: 'Sóng xung kích ngược chiều / Sóng kẹt xe ma (Phantom Traffic Jam / Shockwave Propagation)',
  feynmanExplanation: 'Nó giống như trò chơi Domino phiên bản co giãn: nếu bạn đẩy ngã quân domino quá gần nhau, sóng ngã truyền tới phía trước, nhưng với xe hơi, khi một xe lùi lại một chút thì cả dãy xe phía sau dồn cục lại như một chiếc lò xo bị nén cực đại!',
  stressTestAnswer: 'Nếu tất cả xe đều là xe tự lái (Autonomous Vehicles) giao tiếp trực tiếp với nhau qua sóng radar 0 delay thì hiện tượng này biến mất hoàn toàn!',
  repairedModel: 'Ban đầu tôi nghĩ do có ai đó lái xe ẩu hoặc cố tình dừng lại lâu. Nhưng thực tế chỉ cần độ trễ phản xạ sinh học 0.8s nhân với mật độ xe đạt tới ngưỡng tới hạn (Critical Density) là hiện tượng toán học này TỰ ĐỘNG xảy ra, không phụ thuộc vào ý muốn tài xế!',
  crossDomainConnections: [
    {
      domain: 'Hệ thống máy tính phân tán',
      analogy: 'TCP Backpressure & Bufferbloat',
      underlyingMechanism: 'Khi các gói tin đến router nhanh hơn tốc độ xử lý, buffer đầy nghẽn gây trễ phản hồi, kích hoạt cơ chế retry làm mạng sập cục bộ giống hệt xe dồn cục.',
      wikilink: '[[DistributedSystems/Bufferbloat]]'
    },
    {
      domain: 'Chuỗi cung ứng (Supply Chain)',
      analogy: 'Hiệu ứng roi da (Bullwhip Effect)',
      underlyingMechanism: 'Một biến động nhỏ trong nhu cầu của khách hàng bán lẻ khuếch đại thành đơn hàng biến động khổng lồ ở nhà máy sản xuất do độ trễ truyền tin.',
      wikilink: '[[SupplyChain/BullwhipEffect]]'
    },
    {
      domain: 'Sinh học thần kinh',
      analogy: 'Điện thế hoạt động dọc sợi trục thần kinh (Action Potential)',
      underlyingMechanism: 'Khuếch đại tín hiệu ngưỡng (All-or-none) truyền lan theo một chiều dọc theo màng tế bào.',
      wikilink: '[[Neuroscience/ActionPotential]]'
    }
  ],
  mistakes: [
    {
      id: 'mistake-1',
      timestamp: '2026-10-04T19:10:00.000Z',
      conceptOrPhenomenon: 'Kẹt xe ma trên cao tốc',
      naiveBelief: 'Tắc đường luôn luôn phải có một nguyên nhân vật lý hữu hình ở phía trước (như có người hỏng xe, tai nạn, cảnh sát chặn đường hoặc có kẻ lái ẩu).',
      psychologicalReason: 'Thiên kiến Quy kết Cơ bản (Fundamental Attribution Error) và Tư duy Nhân quả Tuyến tính: con người luôn muốn tìm một thủ phạm cụ thể hoặc một vật cản hữu hình để đổ lỗi.',
      counterexample: 'Thí nghiệm của Đại học Nagoya (Nhật Bản): Cho 22 chiếc xe chạy vòng tròn khép kín với tốc độ ổn định 30km/h trên đường tròn trống trơn không hề có vật cản. Chỉ sau vài phút, sóng phanh tự động hình thành và các xe tự dồn cục tắc nghẽn!',
      cognitiveTrapName: 'Single Cause & Linear Causation Fallacy (Ngụy biện Đơn nhân & Nhân quả tuyến tính)',
      correction: 'Hệ thống phức tạp có thể tự sinh ra trạng thái tắc nghẽn hỗn loạn chỉ từ sự tương tác phi tuyến tính giữa các phần tử bình thường khi vượt ngưỡng tới hạn.',
      heuristicRule: 'Quy tắc: Khi thấy một hệ thống bị tắc nghẽn/tê liệt, đừng vội tìm "thủ phạm xấu", hãy đo lường ĐỘ TRỄ PHẢN HỒI (latency) và MẬT ĐỘ TỚI HẠN (critical density) của luồng chảy!',
      domain: 'Giao thông & Hệ thống phức hợp',
      stepContext: 3
    },
    {
      id: 'mistake-2',
      timestamp: '2026-10-04T19:18:00.000Z',
      conceptOrPhenomenon: 'Kẹt xe ma trên cao tốc',
      naiveBelief: 'Để giải quyết kẹt xe chỉ cần tất cả mọi người cố gắng phóng nhanh và bám sát đuôi xe phía trước để không để hở khoảng trống lãng phí mặt đường.',
      psychologicalReason: 'Trực giác tối ưu cục bộ ngây thơ (Local Optimization): Nhầm tưởng rằng việc thu hẹp khoảng cách sẽ giúp chứa được nhiều xe hơn trên đường.',
      counterexample: 'Càng bám sát thì thời gian phản xạ an toàn càng biến mất, chỉ cần 1 cú nhấp phanh 0.1s của xe trước sẽ buộc xe sau phải phanh gấp 100% lực để không đâm đuôi, làm sóng tắc nghẽn bùng nổ tức thì!',
      cognitiveTrapName: 'Local Optimization vs Global Catastrophe (Tối ưu cục bộ hủy hoại toàn cục)',
      correction: 'Mở rộng khoảng cách đệm (buffer/headway) hoạt động như một bộ giảm chấn (shock absorber) hấp thụ rung lắc, giúp sóng kẹt xe bị triệt tiêu.',
      heuristicRule: 'Quy tắc: Trong bất kỳ đường ống/dòng chảy nào, KHÔNG GIAN ĐỆM (BUFFER) là yếu tố sống còn để chống sụp đổ dây chuyền, không phải sự bám sát nghẹt thở!',
      domain: 'Tối ưu hệ thống & Động lực học',
      stepContext: 8
    }
  ],
  messages: [
    {
      id: 'm1',
      role: 'assistant',
      content: 'Chào mừng bạn đến với Phòng Luyện Tư Duy Socratic. Hãy cùng mổ xẻ hiện tượng "Bí ẩn kẹt xe ma trên cao tốc".\n\nBạn hãy quan sát hiện tượng này và dùng ngôn ngữ mộc mạc nhất hàng ngày để diễn giải: Theo trực giác của bạn, tại sao chỉ 1 cú đạp phanh nhẹ của 1 xe mà nửa tiếng sau cả trăm xe phía sau lại bị kẹt cứng ngắc?',
      timestamp: '2026-10-04T19:01:00.000Z',
      stepContext: 1
    },
    {
      id: 'm2',
      role: 'user',
      content: 'Tôi nghĩ do xe sau bị bất ngờ nên phanh gấp hơn xe trước, rồi xe sau nữa lại càng phanh gấp hơn, tạo thành một dây chuyền giật cục.',
      timestamp: '2026-10-04T19:03:00.000Z',
      stepContext: 2
    },
    {
      id: 'm3',
      role: 'assistant',
      content: 'Quan sát rất nhạy bén! Bạn đã chạm vào ý niệm "dây chuyền". Bây giờ hãy suy ngẫm sâu hơn câu hỏi Socrates này:\n\n1. Giữa lúc mắt tài xế nhìn thấy đèn đỏ của xe trước và lúc chân họ thực sự ấn bàn đạp phanh, điều gì xảy ra trong khoảng thời gian đó?\n2. Nếu khoảng cách giữa các xe là 50 mét so với khi chỉ có 3 mét, điều gì sẽ thay đổi đối với "dây chuyền" này?',
      timestamp: '2026-10-04T19:04:00.000Z',
      stepContext: 3
    }
  ]
};
