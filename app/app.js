/**
 * 阿蝦廚房 - 核心 JavaScript 引擎 (app.js)
 * 實作大轉盤、雪櫃匹配、每週菜單、智能買餸清單與私房菜譜功能
 */

// ==========================================================================
// 1. 內建 22 道精美粵式/家庭私房菜譜數據
// ==========================================================================
const DEFAULT_RECIPES = [
  {
    id: 1,
    name: "番茄炒蛋",
    emoji: "🍳",
    calories: 320,
    prepTime: 15,
    difficulty: "簡單",
    tags: ["快手菜", "家常菜", "清淡健康"],
    ingredients: [
      { name: "番茄", amount: "2個", category: "produce" },
      { name: "雞蛋", amount: "3隻", category: "meat" },
      { name: "蔥花", amount: "少許", category: "produce" },
      { name: "砂糖", amount: "1茶匙", category: "other" }
    ],
    steps: [
      "番茄切塊，雞蛋加少許鹽打散攪勻。",
      "熱鍋下油，倒入蛋液快速炒至半熟，盛起備用。",
      "鍋內再加少許油，放入番茄塊翻炒至軟身出汁，加入砂糖調味。",
      "倒入雞蛋炒勻，撒上蔥花即可起鍋。"
    ]
  },
  {
    id: 2,
    name: "蜜汁叉燒",
    emoji: "🥓",
    calories: 680,
    prepTime: 60,
    difficulty: "中等",
    tags: ["家常菜", "惹味開胃"],
    ingredients: [
      { name: "梅頭豬肉", amount: "500g", category: "meat" },
      { name: "叉燒醬", amount: "3湯匙", category: "other" },
      { name: "蜜糖", amount: "2湯匙", category: "other" },
      { name: "蒜蓉", amount: "1茶匙", category: "produce" }
    ],
    steps: [
      "梅頭豬肉洗淨抹乾，用叉燒醬 and 蒜蓉醃製至少4小時（最好過夜）。",
      "焗爐預熱至200°C，將豬肉放入烤20分鐘。",
      "取出翻面，刷上一層醃肉剩餘的醬汁，再烤15分鐘。",
      "最後取出刷上厚厚一層蜜糖，再焗烤5分鐘至微焦，稍微放涼後切片。"
    ]
  },
  {
    id: 3,
    name: "西蘭花炒牛肉",
    emoji: "🥦",
    calories: 420,
    prepTime: 20,
    difficulty: "簡單",
    tags: ["家常菜", "清淡健康"],
    ingredients: [
      { name: "牛肉片", amount: "200g", category: "meat" },
      { name: "西蘭花", amount: "1棵", category: "produce" },
      { name: "生抽", amount: "1湯匙", category: "other" },
      { name: "蒜蓉", amount: "1茶匙", category: "produce" },
      { name: "生粉", amount: "1茶匙", category: "other" }
    ],
    steps: [
      "牛肉片用生抽、生粉和少許油醃製15分鐘。",
      "西蘭花切小朵，放入沸水中灼30秒，撈起瀝乾。",
      "熱鍋下油，爆香蒜蓉，放入牛肉快速炒至七成熟，盛起。",
      "鍋中再加少許水，倒入西蘭花翻炒，最後加入牛肉與少許鹽炒勻。"
    ]
  },
  {
    id: 4,
    name: "青紅蘿蔔豬骨湯",
    emoji: "🥣",
    calories: 250,
    prepTime: 120,
    difficulty: "簡單",
    tags: ["老火靚湯", "清淡健康"],
    ingredients: [
      { name: "青蘿蔔", amount: "1條", category: "produce" },
      { name: "紅蘿蔔", amount: "1條", category: "produce" },
      { name: "豬骨", amount: "400g", category: "meat" },
      { name: "蜜棗", amount: "2粒", category: "other" },
      { name: "陳皮", amount: "1角", category: "other" }
    ],
    steps: [
      "豬骨洗淨，放入冷水中汆水，撈出沖洗乾淨。",
      "青蘿蔔和紅蘿蔔去皮、切大塊；陳皮浸軟刮去囊。",
      "湯煲內加入足量清水，放入所有材料大火燒開。",
      "轉小火慢煲1.5至2小時，最後加鹽調味即成。"
    ]
  },
  {
    id: 5,
    name: "豉汁蒸排骨",
    emoji: "🍖",
    calories: 480,
    prepTime: 25,
    difficulty: "簡單",
    tags: ["家常菜"],
    ingredients: [
      { name: "排骨", amount: "350g", category: "meat" },
      { name: "豆豉", amount: "1湯匙", category: "other" },
      { name: "蒜蓉", amount: "1茶匙", category: "produce" },
      { name: "生粉", amount: "1茶匙", category: "other" },
      { name: "辣椒段", amount: "少許", category: "produce" }
    ],
    steps: [
      "排骨洗淨瀝乾，豆豉稍微剁碎。",
      "排骨混入豆豉、蒜蓉、生粉、辣椒段和少許油抓勻醃製15分鐘。",
      "水滾後，將排骨平鋪於盤中，大火隔水蒸12-15分鐘至熟透即可。"
    ]
  },
  {
    id: 6,
    name: "薑蔥炒蟹",
    emoji: "🦀",
    calories: 390,
    prepTime: 35,
    difficulty: "困難",
    tags: ["家常菜", "惹味開胃"],
    ingredients: [
      { name: "螃蟹", amount: "2隻", category: "meat" },
      { name: "薑片", amount: "8片", category: "produce" },
      { name: "蔥段", amount: "5支", category: "produce" },
      { name: "紹興酒", amount: "1湯匙", category: "other" },
      { name: "生粉", amount: "2湯匙", category: "other" }
    ],
    steps: [
      "螃蟹宰殺洗淨，斬件，蟹螯拍裂，切口處沾上少許生粉鎖住蟹肉。",
      "熱鍋多油，將蟹件下鍋煎炸至變紅盛出。",
      "鍋內留底油，爆香大量薑片和蔥白，倒回蟹件，沿鍋邊淋入紹興酒。",
      "加入少許水、生抽和糖，蓋上鍋蓋燜2分鐘，最後放入蔥綠炒勻即成。"
    ]
  },
  {
    id: 7,
    name: "椒鹽豆腐",
    emoji: "⬜",
    calories: 280,
    prepTime: 20,
    difficulty: "簡單",
    tags: ["快手菜", "家常菜", "惹味開胃"],
    ingredients: [
      { name: "硬豆腐", amount: "1盒", category: "other" },
      { name: "椒鹽粉", amount: "1茶匙", category: "other" },
      { name: "紅椒粒", amount: "少許", category: "produce" },
      { name: "蔥花", amount: "少許", category: "produce" },
      { name: "脆粉/生粉", amount: "4湯匙", category: "other" }
    ],
    steps: [
      "硬豆腐切成立方小塊，用廚房紙巾吸乾表面水分。",
      "豆腐均勻裹上一層薄生粉。",
      "熱鍋下油，放入豆腐塊小火煎至六面金黃酥脆，撈起瀝油。",
      "鍋留少許油爆香紅椒粒和蔥花，倒入豆腐，撒入椒鹽粉快速兜勻即可。"
    ]
  },
  {
    id: 8,
    name: "蝦仁炒蛋",
    emoji: "🦐",
    calories: 340,
    prepTime: 15,
    difficulty: "簡單",
    tags: ["快手菜", "家常菜", "清淡健康"],
    ingredients: [
      { name: "鮮蝦仁", amount: "150g", category: "meat" },
      { name: "雞蛋", amount: "4隻", category: "meat" },
      { name: "蔥花", amount: "少許", category: "produce" },
      { name: "料酒", amount: "1/2茶匙", category: "other" }
    ],
    steps: [
      "蝦仁去蝦線，用廚房紙吸乾，加少許鹽及料酒醃製10分鐘。",
      "雞蛋液打散，加入蔥花 and 少許鹽拌勻。",
      "熱鍋下油，先將蝦仁炒至變色（八成熟）盛出，稍微放涼倒入蛋液中拌勻。",
      "鍋內重下油，倒入混合蝦仁的蛋液，小火慢推至蛋液半凝固狀，立即關火用餘溫滑熟。"
    ]
  },
  {
    id: 9,
    name: "麻婆豆腐",
    emoji: "🌶️",
    calories: 360,
    prepTime: 20,
    difficulty: "中等",
    tags: ["家常菜", "惹味開胃"],
    ingredients: [
      { name: "嫩豆腐", amount: "1盒", category: "other" },
      { name: "免治豬肉", amount: "100g", category: "meat" },
      { name: "辣豆瓣醬", amount: "1湯匙", category: "other" },
      { name: "花椒粉", amount: "1/2茶匙", category: "other" },
      { name: "蒜蓉", amount: "1茶匙", category: "produce" }
    ],
    steps: [
      "嫩豆腐切小塊，放入微鹽沸水中灼 1 分鐘去除豆腥味，撈起瀝乾。",
      "熱鍋下油，炒熟免治豬肉，加入豆瓣醬、蒜蓉炒出紅油。",
      "加入一小碗水，放入豆腐塊輕輕推勻，中小火燜煮5分鐘。",
      "勾薄芡收汁，起鍋後撒上大量花椒粉及蔥花。"
    ]
  },
  {
    id: 10,
    name: "栗子燜雞",
    emoji: "🍗",
    calories: 520,
    prepTime: 40,
    difficulty: "中等",
    tags: ["家常菜", "惹味開胃"],
    ingredients: [
      { name: "雞肉塊", amount: "400g", category: "meat" },
      { name: "去殼栗子", amount: "150g", category: "produce" },
      { name: "薑片", amount: "4片", category: "produce" },
      { name: "蠔油", amount: "1.5湯匙", category: "other" },
      { name: "生抽", amount: "1湯匙", category: "other" }
    ],
    steps: [
      "雞肉塊用生抽醃製15分鐘；栗子放入沸水煮2分鐘，剝去內皮。",
      "熱鍋下油爆香薑片，放入雞塊大火炒至表面金黃。",
      "加入栗子、蠔油、少許糖及適量溫水，大火燒開轉小火，蓋上燜煮25分鐘。",
      "開大火收稠醬汁，即可上碟。"
    ]
  },
  {
    id: 11,
    name: "蠔油生菜",
    emoji: "🥬",
    calories: 120,
    prepTime: 10,
    difficulty: "簡單",
    tags: ["快手菜", "清淡健康"],
    ingredients: [
      { name: "生菜", amount: "300g", category: "produce" },
      { name: "蠔油", amount: "2湯匙", category: "other" },
      { name: "蒜頭", amount: "2瓣", category: "produce" },
      { name: "油", amount: "1湯匙", category: "other" }
    ],
    steps: [
      "生菜洗淨濾乾；蒜頭剁成蒜蓉。",
      "水滾加入一茶匙鹽和少許油，放入生菜灼30秒至變軟，迅速撈出控乾裝盤。",
      "熱鍋下油炒香蒜蓉，加入蠔油和少許水煮開成芡汁。",
      "將調好的蠔油蒜蓉汁淋在灼好的生菜上即可。"
    ]
  },
  {
    id: 12,
    name: "蒜蓉西蘭花",
    emoji: "🥦",
    calories: 150,
    prepTime: 12,
    difficulty: "簡單",
    tags: ["快手菜", "清淡健康"],
    ingredients: [
      { name: "西蘭花", amount: "1棵", category: "produce" },
      { name: "蒜蓉", amount: "1.5湯匙", category: "produce" },
      { name: "雞粉", amount: "1/2茶匙", category: "other" }
    ],
    steps: [
      "西蘭花切小朵洗淨，滾水加少許鹽灼水45秒撈出瀝乾。",
      "熱鍋下油爆香蒜蓉。",
      "倒入西蘭花快速翻炒，加入雞粉及少許鹽調味即可。"
    ]
  },
  {
    id: 13,
    name: "冬菇蒸雞",
    emoji: "🍄",
    calories: 450,
    prepTime: 35,
    difficulty: "簡單",
    tags: ["家常菜", "清淡健康"],
    ingredients: [
      { name: "雞肉塊", amount: "350g", category: "meat" },
      { name: "乾冬菇", amount: "6朵", category: "produce" },
      { name: "紅棗", amount: "3粒", category: "other" },
      { name: "生抽", amount: "1湯匙", category: "other" },
      { name: "生粉", amount: "1茶匙", category: "other" }
    ],
    steps: [
      "乾冬菇浸軟去蒂切絲；紅棗去核切絲。",
      "雞塊洗淨抹乾，加入冬菇絲、紅棗絲、生抽、生粉和油拌勻醃製20分鐘。",
      "將材料平鋪在盤內，大火隔水蒸15分鐘至全熟即可。"
    ]
  },
  {
    id: 14,
    name: "魚香茄子",
    emoji: "🍆",
    calories: 380,
    prepTime: 25,
    difficulty: "中等",
    tags: ["家常菜", "惹味開胃"],
    ingredients: [
      { name: "茄子", amount: "2條", category: "produce" },
      { name: "免治豬肉", amount: "80g", category: "meat" },
      { name: "蒜蓉", amount: "1茶匙", category: "produce" },
      { name: "豆瓣醬", amount: "1湯匙", category: "other" },
      { name: "醋", amount: "1茶匙", category: "other" }
    ],
    steps: [
      "茄子切滾刀塊，用少許鹽醃一下濾乾水分，或用少許生粉抓勻。",
      "鍋內多油，將茄子炸至變軟撈出瀝乾。",
      "留底油爆香蒜蓉、豆瓣醬，放入免治肉碎炒散熟透。",
      "倒入茄子翻炒，加入生抽、糖調味，起鍋前沿鍋邊淋入醋炒勻。"
    ]
  },
  {
    id: 15,
    name: "蓮藕花生豬骨湯",
    emoji: "🥣",
    calories: 310,
    prepTime: 120,
    difficulty: "簡單",
    tags: ["老火靚湯"],
    ingredients: [
      { name: "蓮藕", amount: "1節", category: "produce" },
      { name: "花生", amount: "50g", category: "produce" },
      { name: "豬骨", amount: "400g", category: "meat" },
      { name: "章魚乾", amount: "1片", category: "meat" },
      { name: "蜜棗", amount: "2粒", category: "other" }
    ],
    steps: [
      "豬骨洗淨汆水；章魚乾浸軟；花生洗淨浸泡20分鐘。",
      "蓮藕去皮洗淨，切厚塊。",
      "湯煲注入清水，放入所有材料大火煲滾。",
      "改小火慢煲 2 小時，最後加入鹽調味。"
    ]
  },
  {
    id: 16,
    name: "乾炒牛河",
    emoji: "🍜",
    calories: 850,
    prepTime: 20,
    difficulty: "中等",
    tags: ["家常菜", "惹味開胃"],
    ingredients: [
      { name: "河粉", amount: "400g", category: "other" },
      { name: "牛肉片", amount: "150g", category: "meat" },
      { name: "韭黃", amount: "50g", category: "produce" },
      { name: "洋蔥絲", amount: "少許", category: "produce" },
      { name: "老抽", amount: "1.5湯匙", category: "other" }
    ],
    steps: [
      "牛肉片加生抽、生粉醃15分鐘後快速下鍋炒至變色盛起。",
      "熱鍋下油，放入洋蔥絲爆香，加入河粉大火翻炒均勻（儘量避免鏟碎）。",
      "加入老抽、生抽、糖調味炒勻，讓河粉著色均勻。",
      "最後加入牛肉、韭黃段，大火快炒數下至韭黃軟身即可起鍋。"
    ]
  },
  {
    id: 17,
    name: "鹽焗雞",
    emoji: "🐔",
    calories: 550,
    prepTime: 50,
    difficulty: "中等",
    tags: ["家常菜"],
    ingredients: [
      { name: "全雞/三黃雞", amount: "1隻", category: "meat" },
      { name: "鹽焗雞粉", amount: "1包", category: "other" },
      { name: "薑黃粉", amount: "1/2茶匙", category: "other" },
      { name: "香油", amount: "1湯匙", category: "other" }
    ],
    steps: [
      "整雞內外洗淨，瀝乾水分。",
      "用鹽焗雞粉和薑黃粉均勻塗抹整雞內外，按摩片刻，醃製至少2小時。",
      "電飯煲底部刷一層薄油，鋪上薑片 and 蔥段，放入醃好的雞。",
      "按煮飯鍵，煮至跳掣後繼續焗10分鐘。用筷子插入雞大腿無血水流出即可取出，放涼後斬件。"
    ]
  },
  {
    id: 18,
    name: "涼拌手撕雞",
    emoji: "🥗",
    calories: 380,
    prepTime: 30,
    difficulty: "簡單",
    tags: ["快手菜", "惹味開胃", "清淡健康"],
    ingredients: [
      { name: "雞胸肉/雞脾", amount: "300g", category: "meat" },
      { name: "芝麻醬", amount: "1.5湯匙", category: "other" },
      { name: "芫荽/香菜", amount: "少許", category: "produce" },
      { name: "蒜蓉", amount: "1茶匙", category: "produce" },
      { name: "辣椒油", amount: "1茶匙", category: "other" }
    ],
    steps: [
      "雞肉放沸水中煮15分鐘至熟透，撈出浸入冰水冷卻。",
      "用手將雞肉撕成細絲，擺入盤中。",
      "將芝麻醬、生抽、醋、蒜蓉、辣椒油和少許冷開水調成料汁。",
      "料汁淋在雞絲上，撒上芫荽碎和熟芝麻即可拌勻食用。"
    ]
  },
  {
    id: 19,
    name: "韭黃炒蛋",
    emoji: "🍳",
    calories: 300,
    prepTime: 12,
    difficulty: "簡單",
    tags: ["快手菜", "家常菜"],
    ingredients: [
      { name: "韭黃", amount: "150g", category: "produce" },
      { name: "雞蛋", amount: "3隻", category: "meat" },
      { name: "鹽", amount: "少許", category: "other" }
    ],
    steps: [
      "韭黃洗淨，切段備用；雞蛋打散成蛋液並加鹽調味。",
      "熱鍋下油，倒入蛋液快速炒至七成熟凝固，盛出。",
      "鍋內補少許油，放入韭黃快速翻炒至軟身（約30秒）。",
      "倒回雞蛋炒勻，快速起鍋，保持韭黃的脆嫩感。"
    ]
  },
  {
    id: 20,
    name: "肉餅蒸蛋",
    emoji: "🍲",
    calories: 420,
    prepTime: 25,
    difficulty: "簡單",
    tags: ["家常菜"],
    ingredients: [
      { name: "免治豬肉", amount: "150g", category: "meat" },
      { name: "雞蛋", amount: "2隻", category: "meat" },
      { name: "生抽", amount: "1茶匙", category: "other" },
      { name: "生粉", amount: "1/2茶匙", category: "other" }
    ],
    steps: [
      "免治肉碎加入生抽、生粉和少許水沿同方向攪拌至起膠，平鋪在淺盤底部。",
      "將兩隻雞蛋溫柔地打在肉餅上方（保留蛋黃完整）。",
      "水滾後，將盤放入蒸鍋內，蓋上中火蒸12-15分鐘至肉餅和雞蛋凝固熟透。",
      "淋上少許熟油及生抽即成。"
    ]
  },
  {
    id: 21,
    name: "蝦米節瓜粉絲煲",
    emoji: "🍲",
    calories: 290,
    prepTime: 25,
    difficulty: "簡單",
    tags: ["家常菜", "清淡健康"],
    ingredients: [
      { name: "節瓜", amount: "1條", category: "produce" },
      { name: "粉絲", amount: "1包", category: "other" },
      { name: "蝦米", amount: "20g", category: "meat" },
      { name: "蒜片", amount: "少許", category: "produce" }
    ],
    steps: [
      "粉絲用溫水浸軟切段；蝦米浸軟洗淨；節瓜去皮切條。",
      "熱鍋下油爆香蒜片與蝦米。",
      "倒入節瓜條翻炒，加入半碗水，大火燒開轉小火燜煮5分鐘。",
      "加入浸軟的粉絲拌勻，吸附湯汁後，加鹽和少許蠔油調味，煮1-2分鐘即可。"
    ]
  },
  {
    id: 22,
    name: "鼎湖上素",
    emoji: "🥗",
    calories: 180,
    prepTime: 30,
    difficulty: "中等",
    tags: ["清淡健康"],
    ingredients: [
      { name: "乾冬菇", amount: "4朵", category: "produce" },
      { name: "雲耳", amount: "15g", category: "produce" },
      { name: "雪耳", amount: "15g", category: "produce" },
      { name: "黃耳/榆耳", amount: "15g", category: "produce" },
      { name: "蠔油", amount: "1湯匙", category: "other" }
    ],
    steps: [
      "所有乾菇菌類（冬菇、雲耳、雪耳等）充分泡發，清洗乾淨切塊。",
      "滾水中加少許鹽，將所有菇菌灼水30秒，撈起控水。",
      "熱鍋下油，倒入菇菌翻炒，加入生抽、蠔油、糖及半杯泡冬菇的水調味。",
      "蓋上蓋燜煮5分鐘，大火勾芡收乾湯汁即成。"
    ]
  }
];

// 雪櫃可用食材清單
const FRIDGE_INGREDIENTS = {
  meat: [
    { name: "雞蛋", emoji: "🥚" },
    { name: "豬肉", emoji: "🐖" },
    { name: "牛肉", emoji: "🐂" },
    { name: "排骨", emoji: "🍖" },
    { name: "梅頭肉", emoji: "🥩" },
    { name: "雞肉", emoji: "🐔" },
    { name: "蝦仁", emoji: "🦐" },
    { name: "螃蟹", emoji: "🦀" },
    { name: "豬骨", emoji: "🦴" },
    { name: "免治肉", emoji: "🧆" },
    { name: "章魚乾", emoji: "🐙" },
    { name: "蝦米", emoji: "🦐" }
  ],
  produce: [
    { name: "番茄", emoji: "🍅" },
    { name: "西蘭花", emoji: "🥦" },
    { name: "青蘿蔔", emoji: "🥕" },
    { name: "紅蘿蔔", emoji: "🥕" },
    { name: "蓮藕", emoji: "🍠" },
    { name: "栗子", emoji: "🌰" },
    { name: "生菜", emoji: "🥬" },
    { name: "乾冬菇", emoji: "🍄" },
    { name: "茄子", emoji: "🍆" },
    { name: "韭黃", emoji: "🌱" },
    { name: "節瓜", emoji: "🥒" },
    { name: "雲耳", emoji: "🍄" },
    { name: "雪耳", emoji: "🍄" },
    { name: "花生", emoji: "🥜" },
    { name: "芫荽", emoji: "🌿" },
    { name: "洋蔥", emoji: "🧅" }
  ],
  other: [
    { name: "硬豆腐", emoji: "⬜" },
    { name: "嫩豆腐", emoji: "⬜" },
    { name: "粉絲", emoji: "🍜" },
    { name: "河粉", emoji: "🍜" },
    { name: "豆豉", emoji: "🧂" }
  ]
};

// ==========================================================================
// 2. 狀態管理
// ==========================================================================
let state = {
  recipes: [],
  selectedFridgeIngredients: new Set(),
  weeklyPlanner: {}, // 格式: { Mon: { breakfast: recipeId, lunch: recipeId, ... } }
  checkedGroceryItems: new Set(), // 格式: "itemName_category"
  customGroceryItems: [], // 格式: [ { name, category, checked } ]
  currentTheme: "light",
  activeTab: "wheel"
};

// Web Audio API 音效合成器
let audioCtx = null;
function playTickSound() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // 頻率 800Hz
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
}

function playWinSound() {
  try {
    if (!audioCtx) return;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    osc1.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12); // E5
    osc1.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.24); // G5
    osc1.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.36); // C6
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(261.63, audioCtx.currentTime); // C4
    osc2.frequency.setValueAtTime(329.63, audioCtx.currentTime + 0.12); // E4
    
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
    
    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.6);
    osc2.stop(audioCtx.currentTime + 0.6);
  } catch (e) {}
}

// ==========================================================================
// 3. 初始化載入
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initAppState();
  registerDOMEvents();
  initTheme();
  
  renderFridgeIngredients();
  renderRecipesGallery();
  renderWeeklyPlanner();
  updateGroceryList();
  
  initWheelCanvas();
});

// 初始化本地資料
function initAppState() {
  const savedRecipes = localStorage.getItem("kitchen_recipes");
  if (savedRecipes) {
    state.recipes = JSON.parse(savedRecipes);
  } else {
    state.recipes = [...DEFAULT_RECIPES];
    localStorage.setItem("kitchen_recipes", JSON.stringify(state.recipes));
  }
  
  const savedPlanner = localStorage.getItem("kitchen_weekly_planner");
  if (savedPlanner) {
    state.weeklyPlanner = JSON.parse(savedPlanner);
  } else {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days.forEach(day => {
      state.weeklyPlanner[day] = { breakfast: null, lunch: null, dinner: null };
    });
    localStorage.setItem("kitchen_weekly_planner", JSON.stringify(state.weeklyPlanner));
  }
  
  const savedCheckedGrocery = localStorage.getItem("kitchen_checked_grocery");
  if (savedCheckedGrocery) {
    state.checkedGroceryItems = new Set(JSON.parse(savedCheckedGrocery));
  }
  
  const savedCustomGrocery = localStorage.getItem("kitchen_custom_grocery");
  if (savedCustomGrocery) {
    state.customGroceryItems = JSON.parse(savedCustomGrocery);
  }
  
  state.currentTheme = localStorage.getItem("kitchen_theme") || "light";
}

// ==========================================================================
// 4. 註冊 DOM 事件
// ==========================================================================
function registerDOMEvents() {
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.dataset.tab;
      switchTab(tabId);
    });
  });

  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentWheelCategory = pill.dataset.category;
      initWheelCanvas();
    });
  });

  document.getElementById("spin-button").addEventListener("click", spinWheel);

  document.getElementById("btn-view-result").addEventListener("click", () => {
    if (lastSelectedRecipe) {
      showRecipeDetailsModal(lastSelectedRecipe);
    }
  });

  document.getElementById("btn-add-result-plan").addEventListener("click", () => {
    if (lastSelectedRecipe) {
      openPlannerSelector(lastSelectedRecipe);
    }
  });

  document.getElementById("btn-clear-fridge").addEventListener("click", () => {
    state.selectedFridgeIngredients.clear();
    document.querySelectorAll(".ingredient-chip").forEach(chip => chip.classList.remove("selected"));
    updateFridgeMatcherCount();
    matchRecipesFromFridge();
  });

  const dayTabs = document.querySelectorAll(".day-tab");
  dayTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      dayTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentSelectedDay = tab.dataset.day;
      renderWeeklyPlanner();
    });
  });

  document.getElementById("btn-auto-plan").addEventListener("click", autoGenerateWeeklyPlan);

  document.getElementById("btn-add-grocery").addEventListener("click", addCustomGroceryItem);
  document.getElementById("new-grocery-item").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addCustomGroceryItem();
  });

  document.getElementById("btn-clear-completed-grocery").addEventListener("click", clearCompletedGrocery);
  document.getElementById("btn-reset-grocery").addEventListener("click", resetGroceryList);

  document.getElementById("recipe-search-input").addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    renderRecipesGallery(query);
  });

  document.getElementById("btn-open-add-recipe").addEventListener("click", () => {
    openModal("modal-add-recipe");
  });

  document.querySelectorAll(".btn-close-modal, .btn-close-modal-footer").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal-backdrop");
      if (modal) closeModal(modal.id);
    });
  });

  document.getElementById("form-add-recipe").addEventListener("submit", handleAddRecipeSubmit);

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });

  document.getElementById("btn-detail-add-planner").addEventListener("click", () => {
    if (currentViewingRecipe) {
      closeModal("modal-recipe-details");
      openPlannerSelector(currentViewingRecipe);
    }
  });

  document.getElementById("btn-confirm-add-plan").addEventListener("click", confirmAddPlan);
}

// ==========================================================================
// 5. 系統通用功能
// ==========================================================================
function switchTab(tabId) {
  state.activeTab = tabId;
  
  document.querySelectorAll(".tab-item").forEach(item => {
    item.classList.toggle("active", item.dataset.tab === tabId);
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });
  
  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) {
    activePane.classList.add("active");
  }

  if (tabId === "wheel") {
    initWheelCanvas();
  }
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  
  const icon = type === "success" ? "✓" : "💡";
  msgEl.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
  
  toast.classList.remove("hidden");
  
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function initTheme() {
  const btn = document.getElementById("dark-mode-toggle");
  const sunIcon = btn.querySelector(".sun-icon");
  const moonIcon = btn.querySelector(".moon-icon");
  
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("kitchen_theme", theme);
    state.currentTheme = theme;
    
    if (theme === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
    
    initWheelCanvas();
  }
  
  applyTheme(state.currentTheme);
  
  btn.addEventListener("click", () => {
    const nextTheme = state.currentTheme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

// ==========================================================================
// 6. 「今日食乜好」大轉盤模組
// ==========================================================================
let currentWheelCategory = "all";
let filteredWheelRecipes = [];
let isSpinning = false;
let wheelAngle = 0;
let lastSelectedRecipe = null;

function initWheelCanvas() {
  const canvas = document.getElementById("wheel-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  if (currentWheelCategory === "all") {
    filteredWheelRecipes = state.recipes;
  } else {
    filteredWheelRecipes = state.recipes.filter(r => r.tags.includes(currentWheelCategory));
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = canvas.width;
  const radius = size / 2;
  const center = radius;
  
  if (filteredWheelRecipes.length === 0) {
    ctx.save();
    ctx.translate(center, center);
    ctx.fillStyle = state.currentTheme === "dark" ? "#A0A0A5" : "#606060";
    ctx.font = "bold 16px Noto Sans TC";
    ctx.textAlign = "center";
    ctx.fillText("該類別尚無菜譜", 0, 0);
    ctx.restore();
    return;
  }
  
  const arcLength = (2 * Math.PI) / filteredWheelRecipes.length;
  
  const colorPalette = state.currentTheme === "dark" 
    ? ["#2F4F4F", "#3B5E5E", "#1F3535", "#4A6E6E"]
    : ["#FFF0EC", "#F4F7EE", "#FFFDF9", "#FFEBE7"];
  
  const textColors = state.currentTheme === "dark"
    ? ["#FFA07A", "#8FBC8F", "#FFF0F5", "#D3D3D3"]
    : ["#FF7E5F", "#789D4A", "#E07A5F", "#FF5A5F"];
    
  for (let i = 0; i < filteredWheelRecipes.length; i++) {
    const currentArcAngle = i * arcLength + wheelAngle;
    
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(currentArcAngle);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius - 10, 0, arcLength);
    ctx.fillStyle = colorPalette[i % colorPalette.length];
    ctx.fill();
    
    ctx.strokeStyle = state.currentTheme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.rotate(arcLength / 2);
    ctx.fillStyle = textColors[i % textColors.length];
    ctx.font = "bold 13px Noto Sans TC";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    
    const dish = filteredWheelRecipes[i];
    let displayText = dish.name;
    if (displayText.length > 5) displayText = displayText.slice(0, 5) + "..";
    
    ctx.fillText(`${dish.emoji} ${displayText}`, radius - 28, 0);
    ctx.restore();
  }
  
  ctx.save();
  ctx.translate(center, center);
  ctx.beginPath();
  ctx.arc(0, 0, radius - 6, 0, 2 * Math.PI);
  ctx.strokeStyle = state.currentTheme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(255,126,95,0.2)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();
}

function spinWheel() {
  if (isSpinning || filteredWheelRecipes.length === 0) return;
  isSpinning = true;
  
  document.getElementById("wheel-result-card").classList.add("hidden");
  
  const spinSpins = 5 + Math.floor(Math.random() * 5);
  const targetSectorIndex = Math.floor(Math.random() * filteredWheelRecipes.length);
  const sectorArc = (2 * Math.PI) / filteredWheelRecipes.length;
  
  const targetAngleOffset = (2 * Math.PI) - (targetSectorIndex * sectorArc) - (sectorArc / 2) - (Math.PI / 2);
  const totalTargetAngle = spinSpins * 2 * Math.PI + targetAngleOffset;
  
  const startTime = performance.now();
  const duration = 6000;
  
  const startAngle = wheelAngle % (2 * Math.PI);
  const deltaAngle = totalTargetAngle - startAngle;
  
  let lastTickIndex = 0;
  
  function animateSpin(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutFactor = 1 - Math.pow(1 - progress, 3);
    wheelAngle = startAngle + deltaAngle * easeOutFactor;
    
    const totalTicksPassed = Math.floor(wheelAngle / sectorArc);
    if (totalTicksPassed > lastTickIndex) {
      playTickSound();
      lastTickIndex = totalTicksPassed;
    }
    
    initWheelCanvas();
    
    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      lastSelectedRecipe = filteredWheelRecipes[targetSectorIndex];
      playWinSound();
      showWheelResult(lastSelectedRecipe);
    }
  }
  
  requestAnimationFrame(animateSpin);
}

function showWheelResult(recipe) {
  const resultCard = document.getElementById("wheel-result-card");
  document.getElementById("result-name").innerText = `${recipe.emoji} ${recipe.name}`;
  document.getElementById("result-calories").innerText = `${recipe.calories} kcal`;
  document.getElementById("result-time").innerText = `${recipe.prepTime} 分鐘`;
  document.getElementById("result-difficulty").innerText = recipe.difficulty;
  
  resultCard.classList.remove("hidden");
  showToast(`抽中美味的 ${recipe.name}！`, "success");
}

// ==========================================================================
// 7. 「雪櫃有咩」智能食材配對模組
// ==========================================================================
function renderFridgeIngredients() {
  const meatGrid = document.querySelector('.ingredients-grid[data-group="meat"]');
  const produceGrid = document.querySelector('.ingredients-grid[data-group="produce"]');
  const otherGrid = document.querySelector('.ingredients-grid[data-group="other"]');
  
  if (!meatGrid) return;
  
  meatGrid.innerHTML = "";
  produceGrid.innerHTML = "";
  otherGrid.innerHTML = "";
  
  Object.keys(FRIDGE_INGREDIENTS).forEach(group => {
    const parentGrid = group === "meat" ? meatGrid : (group === "produce" ? produceGrid : otherGrid);
    FRIDGE_INGREDIENTS[group].forEach(ing => {
      const chip = document.createElement("div");
      chip.className = "ingredient-chip";
      chip.innerHTML = `
        <span class="ing-emoji">${ing.emoji}</span>
        <span class="ing-name">${ing.name}</span>
      `;
      
      chip.addEventListener("click", () => {
        toggleIngredientSelection(ing.name, chip);
      });
      
      parentGrid.appendChild(chip);
    });
  });
}

function toggleIngredientSelection(name, chipEl) {
  if (state.selectedFridgeIngredients.has(name)) {
    state.selectedFridgeIngredients.delete(name);
    chipEl.classList.remove("selected");
  } else {
    state.selectedFridgeIngredients.add(name);
    chipEl.classList.add("selected");
    playTickSound();
  }
  updateFridgeMatcherCount();
  matchRecipesFromFridge();
}

function updateFridgeMatcherCount() {
  document.getElementById("selected-ingredients-count").innerText = state.selectedFridgeIngredients.size;
}

function matchRecipesFromFridge() {
  const listEl = document.getElementById("matched-recipes-list");
  if (!listEl) return;
  
  if (state.selectedFridgeIngredients.size === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="emoji">🍳</span>
        <p>請在上方勾選食材開始配對！</p>
      </div>
    `;
    document.getElementById("matched-recipes-count").innerText = "0";
    return;
  }
  
  const selected = Array.from(state.selectedFridgeIngredients);
  const matched = [];
  
  state.recipes.forEach(recipe => {
    let matchCount = 0;
    recipe.ingredients.forEach(ing => {
      const hasMatch = selected.some(sel => ing.name.includes(sel) || sel.includes(ing.name));
      if (hasMatch) {
        matchCount++;
      }
    });
    
    if (matchCount > 0) {
      const matchRatio = matchCount / recipe.ingredients.length;
      matched.push({ recipe, matchCount, matchRatio });
    }
  });
  
  matched.sort((a, b) => b.matchRatio - a.matchRatio || b.matchCount - a.matchCount);
  
  document.getElementById("matched-recipes-count").innerText = matched.length;
  
  if (matched.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="emoji">🔍</span>
        <p>找不到符合的菜譜，換些食材試試？</p>
      </div>
    `;
    return;
  }
  
  listEl.innerHTML = "";
  matched.forEach(item => {
    const r = item.recipe;
    const pct = Math.round(item.matchRatio * 100);
    
    const card = document.createElement("div");
    card.className = "recipe-row-card";
    card.innerHTML = `
      <span class="recipe-row-emoji">${r.emoji}</span>
      <div class="recipe-row-details">
        <span class="recipe-row-name">${r.name}</span>
        <div class="recipe-row-meta">
          <span>🔥 ${r.calories} kcal</span> | 
          <span>⏱️ ${r.prepTime} 分鐘</span> | 
          <span style="color: var(--secondary-color); font-weight:700;">匹配率 ${pct}%</span>
        </div>
      </div>
      <span class="recipe-row-action">📖</span>
    `;
    
    card.addEventListener("click", () => {
      showRecipeDetailsModal(r);
    });
    
    listEl.appendChild(card);
  });
}

// ==========================================================================
// 8. 「每週菜單規劃」與卡路里模組
// ==========================================================================
let currentSelectedDay = "Mon";
const DAY_LABELS = {
  Mon: "星期一", Tue: "星期二", Wed: "星期三", Thu: "星期四",
  Fri: "星期五", Sat: "星期六", Sun: "星期日"
};

function renderWeeklyPlanner() {
  document.getElementById("current-day-label").innerText = `${DAY_LABELS[currentSelectedDay]}菜單`;
  
  const dayMeals = state.weeklyPlanner[currentSelectedDay] || { breakfast: null, lunch: null, dinner: null };
  let dayTotalCalories = 0;
  
  const mealTypes = ["breakfast", "lunch", "dinner"];
  
  mealTypes.forEach(meal => {
    const dishContainer = document.getElementById(`meal-${meal}-dish`);
    const removeBtn = document.querySelector(`.btn-remove-meal[data-meal="${meal}"]`);
    const addBtn = document.querySelector(`.btn-add-meal[data-meal="${meal}"]`);
    const recipeId = dayMeals[meal];
    
    if (recipeId) {
      const recipe = state.recipes.find(r => r.id === Number(recipeId));
      if (recipe) {
        dayTotalCalories += recipe.calories;
        dishContainer.innerHTML = `
          <span class="dish-name">${recipe.emoji} ${recipe.name}</span>
          <span class="dish-cal">🔥 ${recipe.calories} kcal</span>
        `;
        
        dishContainer.querySelector(".dish-name").addEventListener("click", (e) => {
          e.stopPropagation();
          showRecipeDetailsModal(recipe);
        });
        
        removeBtn.classList.remove("hidden");
        addBtn.classList.add("hidden");
        
        removeBtn.onclick = () => {
          removeMealFromPlan(currentSelectedDay, meal);
        };
      } else {
        renderEmptyMealRow(dishContainer, removeBtn, addBtn, meal);
      }
    } else {
      renderEmptyMealRow(dishContainer, removeBtn, addBtn, meal);
    }
  });
  
  const calBadgeEl = document.getElementById("day-total-calories");
  calBadgeEl.innerText = dayTotalCalories;
  
  updateCalorieAdvice(dayTotalCalories);
}

function renderEmptyMealRow(container, removeBtn, addBtn, meal) {
  container.innerHTML = `<span class="placeholder">尚未規劃</span>`;
  removeBtn.classList.add("hidden");
  addBtn.classList.remove("hidden");
  
  addBtn.onclick = () => {
    openMealSelectorForPlanner(currentSelectedDay, meal);
  };
}

function removeMealFromPlan(day, meal) {
  state.weeklyPlanner[day][meal] = null;
  localStorage.setItem("kitchen_weekly_planner", JSON.stringify(state.weeklyPlanner));
  showToast("已從菜單中移除", "success");
  renderWeeklyPlanner();
  updateGroceryList();
}

function openMealSelectorForPlanner(day, meal) {
  const selectDay = document.getElementById("select-plan-day");
  const selectMeal = document.getElementById("select-plan-meal");
  
  selectDay.value = day;
  selectMeal.value = meal;
  
  openModal("modal-planner-selector");
  
  document.getElementById("plan-selector-dish-name").innerText = `${DAY_LABELS[day]} ${meal === "breakfast" ? "早餐" : (meal === "lunch" ? "午餐" : "晚餐")}`;
  
  const confirmBtn = document.getElementById("btn-confirm-add-plan");
  
  let selectGroup = document.getElementById("temp-recipe-select-group");
  if (!selectGroup) {
    selectGroup = document.createElement("div");
    selectGroup.className = "form-group";
    selectGroup.id = "temp-recipe-select-group";
    selectGroup.innerHTML = `
      <label for="select-plan-recipe">選擇菜式</label>
      <select id="select-plan-recipe" class="form-control"></select>
    `;
    const formGroupMeal = selectMeal.closest(".form-group");
    formGroupMeal.parentNode.insertBefore(selectGroup, formGroupMeal);
  }
  
  const recipeSelect = document.getElementById("select-plan-recipe");
  recipeSelect.innerHTML = state.recipes.map(r => `<option value="${r.id}">${r.emoji} ${r.name} (${r.calories} kcal)</option>`).join("");
  
  confirmBtn.onclick = () => {
    const finalDay = selectDay.value;
    const finalMeal = selectMeal.value;
    const rId = recipeSelect.value;
    
    state.weeklyPlanner[finalDay][finalMeal] = Number(rId);
    localStorage.setItem("kitchen_weekly_planner", JSON.stringify(state.weeklyPlanner));
    
    closeModal("modal-planner-selector");
    showToast("成功規劃一餐！", "success");
    renderWeeklyPlanner();
    updateGroceryList();
  };
}

function updateCalorieAdvice(calories) {
  const adviceEl = document.getElementById("weekly-caloric-advice");
  if (calories === 0) {
    adviceEl.innerText = "🍽️ 尚未規劃本日膳食。點擊上方「智能生成」或點擊右邊的「+」來開啟一天的美味與健康吧！";
  } else if (calories < 1200) {
    adviceEl.innerText = `🔥 本日攝取約 ${calories} kcal。卡路里稍微偏低，適合減脂或輕食日，可適當搭配一份老火湯或甜品。`;
  } else if (calories <= 1800) {
    adviceEl.innerText = `🔥 本日攝取約 ${calories} kcal。完美的黃金健康卡路里區間！飲食均衡，能提供全天充足活力。`;
  } else {
    adviceEl.innerText = `🔥 本日攝取約 ${calories} kcal。能量非常充沛！建議適量減少下餐肉類，並多加一份蔬菜（如蠔油生菜）平衡健康。`;
  }
}

function autoGenerateWeeklyPlan() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const meals = ["breakfast", "lunch", "dinner"];
  
  days.forEach(day => {
    meals.forEach(meal => {
      const randomIdx = Math.floor(Math.random() * state.recipes.length);
      state.weeklyPlanner[day][meal] = state.recipes[randomIdx].id;
    });
  });
  
  localStorage.setItem("kitchen_weekly_planner", JSON.stringify(state.weeklyPlanner));
  showToast("已隨機生成本週營養菜單！", "success");
  renderWeeklyPlanner();
  updateGroceryList();
}

// ==========================================================================
// 9. 「智能買餸清單」模組
// ==========================================================================
function updateGroceryList() {
  const listProduce = document.getElementById("list-produce");
  const listMeat = document.getElementById("list-meat");
  const listOther = document.getElementById("list-other");
  
  if (!listProduce) return;
  
  listProduce.innerHTML = "";
  listMeat.innerHTML = "";
  listOther.innerHTML = "";
  
  const aggregated = {};
  
  Object.keys(state.weeklyPlanner).forEach(day => {
    const dayMeals = state.weeklyPlanner[day];
    Object.keys(dayMeals).forEach(meal => {
      const recipeId = dayMeals[meal];
      if (recipeId) {
        const recipe = state.recipes.find(r => r.id === Number(recipeId));
        if (recipe) {
          recipe.ingredients.forEach(ing => {
            const key = `${ing.name}_${ing.category}`;
            if (!aggregated[key]) {
              aggregated[key] = {
                name: ing.name,
                amounts: [],
                category: ing.category
              };
            }
            aggregated[key].amounts.push(ing.amount);
          });
        }
      }
    });
  });
  
  const itemsToRender = Object.values(aggregated);
  
  itemsToRender.forEach(item => {
    let finalAmount = "";
    let totalNum = 0;
    let unit = "";
    let canSum = true;
    
    item.amounts.forEach(amt => {
      const match = amt.match(/^([0-9.]+)([a-zA-Z\u4e00-\u9fa5]+)$/);
      if (match) {
        totalNum += parseFloat(match[1]);
        unit = match[2];
      } else {
        canSum = false;
      }
    });
    
    if (canSum && totalNum > 0) {
      finalAmount = `${totalNum}${unit}`;
    } else {
      finalAmount = Array.from(new Set(item.amounts)).join(" + ");
    }
    
    const key = `${item.name}_${item.category}`;
    const isChecked = state.checkedGroceryItems.has(key);
    
    const li = createGroceryDOMItem(item.name, finalAmount, item.category, key, isChecked);
    
    if (item.category === "produce") listProduce.appendChild(li);
    else if (item.category === "meat") listMeat.appendChild(li);
    else listOther.appendChild(li);
  });
  
  state.customGroceryItems.forEach((item, index) => {
    const key = `custom_${index}`;
    const li = createGroceryDOMItem(item.name, "", item.category, key, item.checked, true, index);
    
    if (item.category === "produce") listProduce.appendChild(li);
    else if (item.category === "meat") listMeat.appendChild(li);
    else listOther.appendChild(li);
  });
  
  toggleCategoryCardVisibility("grocery-cat-produce", listProduce);
  toggleCategoryCardVisibility("grocery-cat-meat", listMeat);
  toggleCategoryCardVisibility("grocery-cat-other", listOther);
}

function createGroceryDOMItem(name, amount, category, key, isChecked, isCustom = false, customIndex = -1) {
  const li = document.createElement("li");
  li.className = `grocery-item ${isChecked ? "checked" : ""}`;
  
  li.innerHTML = `
    <div class="grocery-item-checkbox"></div>
    <span class="grocery-item-text">${name} ${amount ? `<small>(${amount})</small>` : ""}</span>
    <div class="grocery-item-actions">
      <button aria-label="刪除此項目" class="btn-delete-item">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  `;
  
  li.querySelector(".grocery-item-checkbox").addEventListener("click", () => {
    toggleGroceryItemChecked(key, isChecked, isCustom, customIndex);
  });
  
  const deleteBtn = li.querySelector(".btn-delete-item");
  if (isCustom) {
    deleteBtn.addEventListener("click", () => {
      state.customGroceryItems.splice(customIndex, 1);
      localStorage.setItem("kitchen_custom_grocery", JSON.stringify(state.customGroceryItems));
      updateGroceryList();
      showToast("已刪除該買餸項目", "success");
    });
  } else {
    deleteBtn.style.display = "none";
  }
  
  return li;
}

function toggleGroceryItemChecked(key, currentChecked, isCustom, customIndex) {
  if (isCustom) {
    state.customGroceryItems[customIndex].checked = !currentChecked;
    localStorage.setItem("kitchen_custom_grocery", JSON.stringify(state.customGroceryItems));
  } else {
    if (currentChecked) {
      state.checkedGroceryItems.delete(key);
    } else {
      state.checkedGroceryItems.add(key);
      playTickSound();
    }
    localStorage.setItem("kitchen_checked_grocery", JSON.stringify(Array.from(state.checkedGroceryItems)));
  }
  updateGroceryList();
}

function toggleCategoryCardVisibility(cardId, listEl) {
  const card = document.getElementById(cardId);
  if (listEl.children.length === 0) {
    card.classList.add("hidden");
  } else {
    card.classList.remove("hidden");
  }
}

function addCustomGroceryItem() {
  const input = document.getElementById("new-grocery-item");
  const text = input.value.trim();
  
  if (!text) return;
  
  let guessedCat = "other";
  const meatKeywords = ["肉", "骨", "雞", "蛋", "蟹", "蝦", "排", "魚", "海鮮"];
  const produceKeywords = ["菜", "番茄", "蘿蔔", "西蘭花", "蓮藕", "栗子", "茄子", "蔥", "蒜", "薑", "果", "菇", "耳"];
  
  if (meatKeywords.some(kw => text.includes(kw))) {
    guessedCat = "meat";
  } else if (produceKeywords.some(kw => text.includes(kw))) {
    guessedCat = "produce";
  }
  
  state.customGroceryItems.push({
    name: text,
    category: guessedCat,
    checked: false
  });
  
  localStorage.setItem("kitchen_custom_grocery", JSON.stringify(state.customGroceryItems));
  input.value = "";
  updateGroceryList();
  showToast(`已手動加入 ${text}`, "success");
}

function clearCompletedGrocery() {
  state.customGroceryItems = state.customGroceryItems.filter(item => !item.checked);
  localStorage.setItem("kitchen_custom_grocery", JSON.stringify(state.customGroceryItems));
  
  state.checkedGroceryItems.clear();
  localStorage.setItem("kitchen_checked_grocery", JSON.stringify([]));
  
  updateGroceryList();
  showToast("已清除所有完成項目", "success");
}

function resetGroceryList() {
  if (confirm("確定要重設整張買餸清單嗎？這將會清除所有新增的項目與勾選記錄。")) {
    state.customGroceryItems = [];
    state.checkedGroceryItems.clear();
    localStorage.removeItem("kitchen_custom_grocery");
    localStorage.removeItem("kitchen_checked_grocery");
    updateGroceryList();
    showToast("買餸清單已重設", "success");
  }
}

// ==========================================================================
// 10. 「家庭私房菜譜」模組
// ==========================================================================
let currentViewingRecipe = null;

function renderRecipesGallery(searchQuery = "") {
  const gallery = document.getElementById("recipes-gallery");
  if (!gallery) return;
  
  gallery.innerHTML = "";
  
  const filtered = state.recipes.filter(r => {
    if (!searchQuery) return true;
    const nameMatch = r.name.toLowerCase().includes(searchQuery);
    const tagMatch = r.tags.some(t => t.toLowerCase().includes(searchQuery));
    const ingMatch = r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery));
    return nameMatch || tagMatch || ingMatch;
  });
  
  if (filtered.length === 0) {
    gallery.innerHTML = `
      <div style="grid-column: span 2; padding: 40px 0;" class="empty-state">
        <span class="emoji">🔍</span>
        <p>沒有找到符合的私房菜式</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <div class="recipe-card-visual">
        <span class="recipe-card-emoji">${r.emoji}</span>
        <span class="recipe-card-calories">${r.calories} kcal</span>
      </div>
      <div class="recipe-card-content">
        <h4 class="recipe-card-title">${r.name}</h4>
        <div class="recipe-card-meta">
          <span>⏱️ ${r.prepTime}m</span>
          <span style="color: var(--primary-color)">${r.difficulty}</span>
        </div>
      </div>
    `;
    
    card.addEventListener("click", () => {
      showRecipeDetailsModal(r);
    });
    
    gallery.appendChild(card);
  });
}

function showRecipeDetailsModal(recipe) {
  currentViewingRecipe = recipe;
  
  document.getElementById("detail-recipe-name").innerText = `${recipe.emoji} ${recipe.name}`;
  document.getElementById("detail-recipe-calories").innerText = `${recipe.calories} kcal`;
  document.getElementById("detail-recipe-time").innerText = `${recipe.prepTime} 分鐘`;
  document.getElementById("detail-recipe-difficulty").innerText = recipe.difficulty;
  document.getElementById("detail-recipe-emoji").innerText = recipe.emoji;
  
  const ingList = document.getElementById("detail-recipe-ingredients");
  ingList.innerHTML = recipe.ingredients.map(ing => {
    const catEmoji = ing.category === "produce" ? "🥬" : (ing.category === "meat" ? "🥩" : "🧂");
    return `<li><span>${catEmoji} ${ing.name}</span> <span style="opacity:0.8;">${ing.amount}</span></li>`;
  }).join("");
  
  const stepsList = document.getElementById("detail-recipe-steps");
  stepsList.innerHTML = recipe.steps.map(step => `<li>${step}</li>`).join("");
  
  openModal("modal-recipe-details");
}

function openPlannerSelector(recipe) {
  document.getElementById("plan-selector-dish-name").innerText = recipe.name;
  
  document.getElementById("select-plan-day").value = "Mon";
  document.getElementById("select-plan-meal").value = "lunch";
  
  openModal("modal-planner-selector");
  
  const confirmBtn = document.getElementById("btn-confirm-add-plan");
  confirmBtn.onclick = () => {
    const day = document.getElementById("select-plan-day").value;
    const meal = document.getElementById("select-plan-meal").value;
    
    state.weeklyPlanner[day][meal] = recipe.id;
    localStorage.setItem("kitchen_weekly_planner", JSON.stringify(state.weeklyPlanner));
    
    closeModal("modal-planner-selector");
    showToast(`已成功將 ${recipe.name} 安排到 ${DAY_LABELS[day]}的${meal === "breakfast" ? "早餐" : (meal === "lunch" ? "午餐" : "晚餐")}！`, "success");
    renderWeeklyPlanner();
    updateGroceryList();
  };
}

function confirmAddPlan() {}

function handleAddRecipeSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById("recipe-name").value.trim();
  const emoji = document.getElementById("recipe-emoji").value.trim() || "🍳";
  const calories = Number(document.getElementById("recipe-calories").value);
  const time = Number(document.getElementById("recipe-time").value);
  const difficulty = document.getElementById("recipe-difficulty").value;
  
  const tagCheckboxes = document.querySelectorAll('input[name="recipe-tags"]:checked');
  const tags = Array.from(tagCheckboxes).map(cb => cb.value);
  
  const ingRaw = document.getElementById("recipe-ingredients-input").value.trim();
  const ingredients = [];
  
  const lines = ingRaw.split("\n");
  lines.forEach(line => {
    if (!line.trim()) return;
    const parts = line.split(",");
    const nameAmt = parts[0].split(":");
    
    const ingName = nameAmt[0] ? nameAmt[0].trim() : "";
    const ingAmt = nameAmt[1] ? nameAmt[1].trim() : "適量";
    let ingCat = parts[1] ? parts[1].trim().toLowerCase() : "other";
    
    if (ingCat !== "produce" && ingCat !== "meat" && ingCat !== "other") {
      ingCat = "other";
    }
    
    if (ingName) {
      ingredients.push({
        name: ingName,
        amount: ingAmt,
        category: ingCat
      });
    }
  });
  
  const stepsRaw = document.getElementById("recipe-steps-input").value.trim();
  const steps = stepsRaw.split("\n").map(s => s.trim()).filter(s => s.length > 0);
  
  if (ingredients.length === 0 || steps.length === 0) {
    alert("請至少輸入一個食材與烹飪步驟！");
    return;
  }
  
  const newRecipe = {
    id: Date.now(),
    name,
    emoji,
    calories,
    prepTime: time,
    difficulty,
    tags,
    ingredients,
    steps
  };
  
  state.recipes.push(newRecipe);
  localStorage.setItem("kitchen_recipes", JSON.stringify(state.recipes));
  
  e.target.reset();
  closeModal("modal-add-recipe");
  
  renderRecipesGallery();
  initWheelCanvas();
  showToast(`成功新增私房菜：${name}！`, "success");
}
