import { SessionData, MistakeRecord } from '../types/tutor';

/**
 * Formats only the Mental Model summary as an Obsidian-ready Markdown string
 */
export function formatMentalModelMarkdown(session: SessionData): string {
  const title = session.officialConcept || session.title || 'Mental Model';
  
  return `### 🧠 Mental Model Summary: [[${title}]]
- **Lĩnh vực:** #${session.domain ? session.domain.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : 'general'}
- **Hiện tượng / Khái niệm ban đầu:** ${session.phenomenon || session.concept || 'Chưa khởi tạo'}
- **Trực giác đời thường (Layman Intuition):** ${session.userExplanation || 'N/A'}
- **Quy luật phát hiện (Pattern):** ${session.patterns || 'N/A'}
- **Cơ chế cốt lõi (Mechanism):** ${session.mechanism || 'N/A'}
- **Thuật ngữ chính thức (Official Term):** **[[${session.officialConcept || session.concept || (session.currentStep < 6 ? '(Khóa đến bước 6)' : 'Chưa cập nhật')}]]**
- **Ẩn dụ Feynman (Explain Like I'm 10):**
> "${session.feynmanExplanation || 'N/A'}"
- **Boundary Stress Test:** ${session.stressTestAnswer || 'N/A'}
- **Mô hình sau hiệu chỉnh (Repaired Model):** ${session.repairedModel || 'N/A'}`;
}

/**
 * Formats only the Mistake Autopsy entries as an Obsidian-ready Markdown string with tags and callouts
 */
export function formatMistakeAutopsyMarkdown(session: SessionData): string {
  const title = session.officialConcept || session.title || 'Bài Học';
  
  if (!session.mistakes || session.mistakes.length === 0) {
    return `### 🚨 Mistake Autopsy & Anti-Pattern Vault: [[${title}]]
*(Chưa ghi nhận sai sót nào trong phiên này)*`;
  }

  const mistakeItems = session.mistakes.map((m, idx) => `
#### ⚠️ Bẫy ${idx + 1}: [[${m.cognitiveTrapName}]] #mistake-autopsy
> [!caution] ❌ Trực giác ngây thơ lúc đầu
> "${m.naiveBelief}"

- **🧠 Vì sao não bộ dễ mắc bẫy:** ${m.psychologicalReason}
- **💥 Phản ví dụ (Counterexample) bẻ gãy:** ${m.counterexample}
- **✅ Cách hiệu chỉnh Mental Model:** ${m.correction}
- **🛡️ Thần chú Heuristic né bẫy:** **${m.heuristicRule}**
- *Lĩnh vực:* #${m.domain.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} • *Ghi nhận ở:* Bước ${m.stepContext}
`).join('\n');

  return `### 🚨 Mistake Autopsy & Anti-Pattern Vault: [[${title}]]
${mistakeItems}`;
}

/**
 * Formats both the Mental Model and Mistake Autopsy together with YAML Frontmatter for Obsidian
 */
export function formatFullSessionMarkdown(session: SessionData): string {
  const title = session.officialConcept || session.title || 'Mental Model Note';
  const dateStr = new Date().toISOString().split('T')[0];
  const domainTag = session.domain ? session.domain.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : 'general';

  const mentalModelSection = formatMentalModelMarkdown(session);
  const mistakeSection = formatMistakeAutopsyMarkdown(session);

  const crossDomainSection = session.crossDomainConnections && session.crossDomainConnections.length > 0
    ? session.crossDomainConnections.map(c => `- **[[${c.wikilink.replace(/[[\]]/g, '')}]]** (${c.domain}): ${c.underlyingMechanism}`).join('\n')
    : `- [[SystemsThinking/FeedbackLoops]]\n- [[ComplexityTheory/Emergence]]`;

  return `---
title: "${title}"
aliases: ["${session.officialConcept || session.title}"]
tags: ["second-brain", "mental-models", "mistake-autopsy", "${domainTag}"]
created: ${dateStr}
type: permanent-note
status: verified-mental-model
---

# [[${title}]]

${mentalModelSection}

---

${mistakeSection}

---

### 🌐 Mạng Lưới Liên Kết Đa Ngành (Cross-Domain Wikilinks):
${crossDomainSection}

### 🔗 Dataview Query Tra Cứu Sai Lầm (Obsidian):
\`\`\`dataview
TABLE cognitiveTrapName as "Bẫy nhận thức", heuristicRule as "Thần chú né"
FROM #mistake-autopsy
SORT created desc
\`\`\`
`;
}
