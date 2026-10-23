---
description: "Command routing: /agent-skills:webperf must reach what it is wired to."
expected_outcome: "/webperf dispatches web-performance-auditor."
max_turns: 15
allowed_tools: [Read, Glob, Grep, Skill, Agent]
---

/agent-skills:webperf Audit the performance of our homepage: LCP 4.1s, CLS 0.25 on mobile.

```html
<head>
  <link rel="stylesheet" href="https://fonts.example.com/css?family=Inter|Lora|Fira+Code">
  <script src="https://chat.example.com/widget.js"></script>
</head>
<body>
  <img src="/hero-4000x2600.png">
  <div id="promo-banner"></div>
  <script>document.getElementById("promo-banner").innerHTML = fetchBannerSync();</script>
</body>
```
