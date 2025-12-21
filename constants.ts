import { PlayId, PlayData, MapLayerType, MapMarker } from './types';

/**
 * 💡 提示：要替换图片，请修改下方每个剧目的 coverImage 字段。
 * 可以使用线上 URL 或 Base64 字符串。
 */
export const PLAYS: Record<PlayId, PlayData> = {
  [PlayId.DI_NV_HUA]: {
    id: PlayId.DI_NV_HUA,
    title: '帝女花',
    titleEn: 'Princess Chang Ping',
    themeColor: '#8B0000',
    coverImage: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E5%B8%9D%E5%A5%B3%E8%8A%B1.jpg',
    intro: {
      zh: '《帝女花》是粤剧传世经典，讲述明末长平公主与周世显在国破家亡之际，矢志不渝的凄美爱情。全剧辞藻华丽，情感炽热，尤以“香夭”一折最为脍炙人口。',
      en: '"Princess Chang Ping" is a masterpiece of Cantonese Opera. It tells the tragic romance between Princess Changping and Zhou Shixian during the fall of the Ming Dynasty.'
    },
    characters: {
      nodes: [
        { id: 'changping', name: '长平公主', nameEn: 'Princess Changping', roleType: 'Dan', group: 1 },
        { id: 'shixian', name: '周世显', nameEn: 'Zhou Shixian', roleType: 'Sheng', group: 1 },
        { id: 'chongzhen', name: '崇祯帝', nameEn: 'Emperor Chongzhen', roleType: 'Sheng', group: 2 },
        { id: 'zhouzhong', name: '周钟', nameEn: 'Zhou Zhong', roleType: 'Chou', group: 3 },
      ],
      links: [
        { source: 'changping', target: 'shixian', relation: 'Lovers/Spouses', value: 5 },
        { source: 'chongzhen', target: 'changping', relation: 'Father/Daughter', value: 3 },
      ]
    },
    lyrics: [
      {
        speaker: '长平/周世显',
        original: '落花满天蔽月光，借一杯附荐凤台上。',
        vernacular: '漫天落花遮蔽了月光，借这一杯酒在凤台上祭奠亡灵。',
        english: 'Falling flowers fill the sky, obscuring the moonlight; I offer this cup of wine on the Phoenix Terrace.'
      }
    ],
    timeline: [
      { sceneTitle: '树盟', description: 'Princess Changping and Zhou Shixian betroth under the flowering tree.' },
      { sceneTitle: '香夭', description: 'The couple drinks poisonous wine under the trees, dying for their love and loyalty.' }
    ],
    easterEgg: {
      triggerIcon: '🌸',
      title: 'The Legend of Tang Tik-sang',
      content: 'Legend has it that the playwright Tang Tik-sang passed away during the premiere of this scene.',
      hint: 'A fallen flower hides a story...'
    },
    reviews: [
      { id: '1', user: 'OperaFanHK', content: 'The poetry in Xiang Yao always brings tears to my eyes.', date: '2024-03-15', rating: 5 }
    ]
  },
  [PlayId.ZI_CHAI_JI]: {
    id: PlayId.ZI_CHAI_JI,
    title: '紫钗记',
    titleEn: 'The Purple Hairpin',
    themeColor: '#4B0082',
    coverImage: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E7%B4%AB%E9%92%97%E8%AE%B0.jpg',
    intro: {
      zh: '《紫钗记》讲述名妓之女霍小玉与才子李益因紫玉钗定情，虽经权贵百般阻挠，终得黄衫客相助，剑合钗圆的传奇故事。它是关于私人誓言如何对抗公共制度的深刻隐喻。',
      en: '"The Purple Hairpin" recounts the romance between Huo Xiaoyu and Li Yi, betrothed via a purple hairpin. It is a profound metaphor for personal vows vs. institutional order.'
    },
    characters: {
      nodes: [
        { id: 'xiaoyu', name: '霍小玉', nameEn: 'Huo Xiaoyu', roleType: 'Dan', group: 1 },
        { id: 'liyi', name: '李益', nameEn: 'Li Yi', roleType: 'Sheng', group: 1 },
        { id: 'baosiniang', name: '鲍四娘', nameEn: 'Bao Siniang', roleType: 'Dan/Chou', group: 2 },
        { id: 'system', name: '功名制度', nameEn: 'Imperial Order', roleType: 'Abstract', group: 3 },
      ],
      links: [
        { source: 'xiaoyu', target: 'liyi', relation: 'Vows & Wait', value: 5 },
        { source: 'xiaoyu', target: 'baosiniang', relation: 'Sisterhood/Support', value: 3 },
        { source: 'liyi', target: 'system', relation: 'Compromise/Order', value: 4 },
      ]
    },
    lyrics: [
      {
        speaker: '李益',
        original: '携书剑，滞京华。路有招贤黄榜挂。',
        vernacular: '带着书和剑流落在京城，看着那招贤纳才的皇榜。',
        english: 'Carrying my books and sword, stranded in the capital, gazing at the royal recruitment list.'
      }
    ],
    timeline: [
      { sceneTitle: '拾钗', description: 'Li Yi finds the purple hairpin dropped by Xiaoyu.' },
      { sceneTitle: '剑合钗圆', description: 'The lovers reunite and the broken hairpin is made whole again.' }
    ],
    easterEgg: {
      triggerIcon: '🟣',
      title: 'The Anchor of Emotion',
      content: 'The hairpin is not just an ornament; it is the material anchor that prevents their love from drifting away in a system that tries to erase it.',
      hint: 'The hairpin holds a secret history...'
    },
    reviews: []
  },
  [PlayId.HONG_MEI_JI]: {
    id: PlayId.HONG_MEI_JI,
    title: '再世红梅记',
    titleEn: 'Reincarnation of Red Plum',
    themeColor: '#C0392B',
    coverImage: 'https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E5%86%8D%E4%B8%96%E7%BA%A2%E6%A2%85%E8%AE%B0.jpg',
    intro: {
      zh: '剧中李慧娘因赞美裴禹一句“美哉少年”，被奸相贾似道杀害。慧娘冤魂不散，救裴禹于危难。',
      en: 'Li Huiniang is killed by the Prime Minister but her spirit remains to protect her lover.'
    },
    characters: {
      nodes: [
        { id: 'peiyu', name: '裴禹', nameEn: 'Pei Yu', roleType: 'Sheng', group: 1 },
        { id: 'huiniang', name: '李慧娘', nameEn: 'Li Huiniang', roleType: 'Dan', group: 1 },
      ],
      links: [
        { source: 'huiniang', target: 'peiyu', relation: 'Savior', value: 5 },
      ]
    },
    lyrics: [
      {
        speaker: '李慧娘',
        original: '这也是一点痴情，即使身化烟尘，也不甘抛弃。',
        vernacular: '即使身体化作烟尘，也不甘心抛弃这份爱。',
        english: 'Even if my body turns to smoke, I am unwilling to abandon it.'
      }
    ],
    timeline: [
      { sceneTitle: '观柳', description: 'Huiniang sees Pei Yu by the willow.' }
    ],
    easterEgg: {
      triggerIcon: '🔥',
      title: 'Ghost Steps',
      content: 'Special technique used to simulate floating.',
      hint: 'Beware the ghostly flame...'
    },
    reviews: []
  }
};

export const MAP_MARKERS: MapMarker[] = [
  // DRAMATIC SPACE
  {
    id: 'palace',
    type: MapLayerType.DRAMATIC,
    name: '宫廷',
    nameEn: 'Imperial Palace',
    x: 45, y: 35,
    category: '权力中心',
    categoryEn: 'Power Center',
    plays: [PlayId.DI_NV_HUA],
    description: '宫廷在粤剧中是个体情感被制度吞没的场所。',
    lyrics: '倚殿阴森奇树双，明珠万颗映花黄。',
    culturalInsight: '象征国家责任与个体牺牲的终极对抗。'
  },
  {
    id: 'monastery',
    type: MapLayerType.DRAMATIC,
    name: '庵堂 / 佛寺',
    nameEn: 'Monastery',
    x: 30, y: 60,
    category: '出世之地',
    categoryEn: 'Sacred Refuge',
    plays: [PlayId.DI_NV_HUA, PlayId.HONG_MEI_JI],
    description: '庵堂常作为“情感被迫降速的空间”。',
    culturalInsight: '提供身份隐藏与命运转折的戏剧张力。'
  },
  {
    id: 'jiangnan',
    type: MapLayerType.DRAMATIC,
    name: '江南',
    nameEn: 'Jiangnan',
    x: 65, y: 55,
    category: '流动世界',
    categoryEn: 'Flowing World',
    plays: [PlayId.ZI_CHAI_JI, PlayId.HONG_MEI_JI],
    description: '江南是一种“可发生爱情的文化想象空间”。',
    culturalInsight: '才子佳人传说的永恒背景。'
  },
  {
    id: 'netherworld',
    type: MapLayerType.DRAMATIC,
    name: '阴间 / 梦境',
    nameEn: 'Netherworld',
    x: 15, y: 80,
    category: '超现实',
    categoryEn: 'Surreal Space',
    plays: [PlayId.HONG_MEI_JI],
    description: '粤剧中浪漫主义与民间信仰结合的典型空间。',
    culturalInsight: '情感超越生死，通过魂魄实现昭雪。'
  },
  
  // REAL SPACE - 广州
  {
    id: 'guangzhou',
    type: MapLayerType.REAL,
    name: '广州',
    nameEn: 'Guangzhou',
    x: 50, y: 40,
    category: '发源地',
    categoryEn: 'Origin',
    description: '作为粤剧诞生与发展的核心区域，广州的戏院不仅是演出场所，更是粤剧行当制度、表演程式和观众审美规范逐步形成的物理与社会空间。',
    culturalInsight: 'As the birthplace and institutional centre, Guangzhou’s theatres form a city-wide network of opera houses that helped the art form evolve.',
    subMarkers: [
      {
        id: 'gz_theatre',
        type: MapLayerType.REAL,
        name: '广东粤剧院',
        nameEn: 'Guangdong Cantonese Opera Theatre',
        x: 50, y: 20,
        category: '专业剧团',
        categoryEn: 'Professional',
        period: '1953 年建院至今',
        role: '广州主要的专业粤剧团体与演出机构',
        functions: '官方专业剧院 / 演出经典与新编剧目 600+ 出 / 规范化重要平台',
        significance: 'Founded in 1953 as a state-affiliated company; established repertoire standards.',
        plays: [PlayId.DI_NV_HUA, PlayId.ZI_CHAI_JI, PlayId.HONG_MEI_JI],
        description: 'Major professional theatre in Yuexiu District.',
        culturalInsight: 'Platform for establishing standards.'
      },
      {
        id: 'gz_pingan',
        type: MapLayerType.REAL,
        name: '平安大戏院',
        nameEn: 'Ping’an Grand Theatre',
        x: 30, y: 50,
        category: '历史剧院',
        categoryEn: 'Historical',
        period: '1951 年建院 (1950s-1960s 最繁盛)',
        role: '广州老字号戏剧与粤剧演出场所',
        functions: '最繁盛的文娱中心 / 粤剧班社常驻演出 / 市民生活历史见证',
        significance: 'Its heyday corresponded with a peak period of local opera patronage.',
        description: 'Located in Xiguan, a central cultural hub mid-20th century.',
        culturalInsight: 'A historic witness to local entertainment culture.'
      },
      {
        id: 'gz_guangfu',
        type: MapLayerType.REAL,
        name: '广福台',
        nameEn: 'Guangfu Stage',
        x: 60, y: 75,
        category: '传统戏台',
        categoryEn: 'Traditional Stage',
        period: '传统复建 / 当代空间',
        role: '粤剧艺术博物馆核心古戏台',
        functions: '定期举行传统演出 / 社区互动体验 / 保留纯木结构建筑',
        significance: 'Preserves rare wooden structure; core for community engagement.',
        description: 'Located at the Cantonese Opera Art Museum in Liwan.',
        culturalInsight: 'A rare example of pure wooden theatre architecture.'
      }
    ]
  },
  
  // REAL SPACE - 香港
  {
    id: 'hongkong',
    type: MapLayerType.REAL,
    name: '香港',
    nameEn: 'Hong Kong',
    x: 55, y: 50,
    category: '现代枢纽',
    categoryEn: 'Modern Hub',
    description: '现代粤剧传播枢纽。推动了粤剧从地方戏曲走向商业化与跨区域传播。',
    culturalInsight: 'Focuses on commercial performance and canonical preservation.',
    subMarkers: [
      {
        id: 'hk_lee',
        type: MapLayerType.REAL,
        name: '利舞台',
        nameEn: 'Lee Theatre',
        x: 60, y: 40,
        category: '商业辉煌',
        categoryEn: 'Commercial',
        role: '现代粤剧商业演出与经典定型的重要场所',
        functions: '大型粤剧长期上演 / 名伶驻演 / 版本高度稳定',
        plays: [PlayId.DI_NV_HUA, PlayId.ZI_CHAI_JI],
        description: 'Major site for commercial performances and canonical stabilization.',
        culturalInsight: 'Stabilization of classic versions happened here.',
        significance: 'Associated with masterpieces by Tang Tik-sang.'
      },
      {
        id: 'hk_sunbeam',
        type: MapLayerType.REAL,
        name: '新光戏院',
        nameEn: 'Sunbeam Theatre',
        x: 40, y: 70,
        category: '传承空间',
        categoryEn: 'Heritage',
        role: '当代粤剧传承与公共文化空间',
        functions: '传统剧目持续演出 / 新编戏与实验尝试 / 年轻观众培养',
        description: 'Contemporary hub for Cantonese opera preservation.',
        culturalInsight: 'Cultivation of younger audiences and experimental plays.',
        significance: 'A vital public space for living heritage.'
      }
    ]
  },
  
  // REAL SPACE - 东南亚
  {
    id: 'southeastasia',
    type: MapLayerType.REAL,
    name: '东南亚',
    nameEn: 'Southeast Asia',
    x: 35, y: 85,
    category: '海外传播',
    categoryEn: 'Overseas',
    description: '在东南亚，粤剧不仅随人口迁移传播，也随剧目类型发生选择性保留。爱情戏、因果戏与仪式性剧目，在不同地区形成了各自的演出重点。',
    culturalInsight: 'In Southeast Asia, Cantonese opera traveled with migration and evolved through selective repertoires. Love tragedies, karmic narratives, and ritual-oriented operas gained prominence.',
    subMarkers: [
      {
        id: 'sg_chinatown',
        type: MapLayerType.REAL,
        name: '新加坡 · 牛车水',
        nameEn: 'Singapore · Chinatown',
        x: 45, y: 25,
        category: '社区空间',
        categoryEn: 'Community',
        role: '临时戏棚 / 社区演出空间',
        functions: '节庆神诞搭建临时戏棚 / 宗教仪式社区活动结合 / 粤籍华人乡音寄托',
        plays: [PlayId.DI_NV_HUA, PlayId.ZI_CHAI_JI, PlayId.HONG_MEI_JI],
        significance: 'In Singapore, opera is a "common native dialect" witnessed together.',
        description: 'Chinatown, the historical hub of Cantonese migrants since early 20th century.',
        culturalInsight: 'Adaptable excerpts (Zhezi) emphasizing melody and emotion.'
      },
      {
        id: 'sg_opera_centre',
        type: MapLayerType.REAL,
        name: '新加坡戏曲中心',
        nameEn: 'Singapore Chinese Opera Centre',
        x: 55, y: 35,
        category: '现代剧场',
        categoryEn: 'Modern Venue',
        role: '当代粤剧与多剧种并存平台',
        functions: '传统与改编剧目演出 / 海外推广教育 / 与粤港澳交流',
        significance: 'Marking the transition of opera into the public cultural system.',
        description: 'A professional platform for global exchange and modern reinterpretation.',
        culturalInsight: 'Re-interpretation targeting cross-cultural accessibility.'
      },
      {
        id: 'my_penang',
        type: MapLayerType.REAL,
        name: '槟城 · 乔治市',
        nameEn: 'George Town, Penang',
        x: 25, y: 45,
        category: '华人会馆',
        categoryEn: 'Kongsi Stage',
        role: '华人会馆 + 社区戏台',
        functions: '会馆戏台 / 神庙广场演出 / 维系宗族与地方认同',
        plays: [PlayId.HONG_MEI_JI],
        significance: 'Opera serves as a bond for clan and local identity in Penang.',
        description: 'Dating back to the late 19th century in Malaysia\'s earliest Chinese settlements.',
        culturalInsight: 'Ritual plays for deity celebration prioritized over romance.'
      },
      {
        id: 'my_kl',
        type: MapLayerType.REAL,
        name: '吉隆坡演出点',
        nameEn: 'Kuala Lumpur Performance Points',
        x: 35, y: 60,
        category: '都市流动',
        categoryEn: 'Urban Flow',
        role: '多功能剧场 / 社区流动演出',
        functions: '戏迷组织推动 / 与华文教育联动 / “去戏院化”生存模式',
        significance: 'Reflecting the "de-theatricalization" of opera in modern cities.',
        description: 'Fluid performance sites driven by social clubs and schools.',
        culturalInsight: 'Doubling as performance and educational demonstration.'
      },
      {
        id: 'vn_hcmc',
        type: MapLayerType.REAL,
        name: '胡志明市粤籍社区',
        nameEn: 'HCMC Cantonese Community',
        x: 65, y: 30,
        category: '族群内向',
        categoryEn: 'Inward Heritage',
        role: '会馆 / 临时舞台',
        functions: '族群内部文化保存 / 神诞庙会核心形式 / 古老习惯保留',
        plays: [PlayId.HONG_MEI_JI],
        significance: 'Preserving older performance habits as internal group culture.',
        description: 'Formerly Saigon, a key Indochinese hub for opera in the early 20th century.',
        culturalInsight: 'Fewer modern adaptations, preserving early vocal styles.'
      },
      {
        id: 'th_bangkok',
        type: MapLayerType.REAL,
        name: '曼谷 · 唐人街',
        nameEn: 'Yaowarat, Bangkok',
        x: 25, y: 20,
        category: '多元共存',
        categoryEn: 'Co-existence',
        role: '社区演出空间',
        functions: '与潮剧汉剧并存 / 规模较小 / 传统唱念形式',
        plays: [PlayId.DI_NV_HUA, PlayId.ZI_CHAI_JI],
        significance: 'Reflecting opera\'s co-existence in multi-dialectal Chinese societies.',
        description: 'Small-scale performances focusing on traditional vocal delivery.',
        culturalInsight: 'Short duration excerpts emphasizing emotional peaks.'
      }
    ]
  }
];