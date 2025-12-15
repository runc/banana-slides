import { Language } from '../types';

export const translations = {
  en: {
    home: {
      title: "Slide Deck",
      subtitlePrefix: "Turn your ideas into stunning slides with",
      subtitleHighlight: "Slide Deck",
      subtitleSuffix: "",
      placeholder: "Describe your presentation idea, or drop images, PDFs, or audio...",
      dropFiles: "Drop files here...",
      attach: "Attach",
      poweredBy: "Powered by Gemini",
      history: "History",
      noHistory: "No presentations yet. Create your first one above!",
      deletePresentationTitle: "Delete Presentation",
      deletePresentationConfirm: "Are you sure you want to delete this presentation? This action cannot be undone.",
      delete: "Delete",
      open: "Open",
      suggestions: [
        "What's an AI Agent?",
        "A pitch deck for a startup building AI coffee machines",
        "How to make perfect sourdough bread",
        "The future of renewable energy"
      ]
    },
    outline: {
      title: "Slide Outline",
      subtitle: "Review and edit your structure before generating images.",
      generating: "AI Generating...",
      parsing: "Parsing structure...",
      initializing: "Initializing...",
      parseError: "Could not auto-parse the outline. Please try again or wait for generation to complete.",
      generateSlides: "Generate Slides",
      slideLabel: "SLIDE",
      fieldTitle: "Title",
      fieldContent: "Content",
      fieldVisual: "Visual Prompt",
      attached: "Attached",
      waitingForTokens: "Waiting for tokens..."
    },
    slideShow: {
        slide: "Slide",
        of: "of",
        processing: "Processing",
        exportPPTX: "Export PPTX",
        newSlide: "New Slide",
        deleteSlideTitle: "Delete Slide",
        deleteSlideConfirm: "Are you sure you want to delete this slide? This action cannot be undone.",
        stopGenerating: "Stop Generating",
        generationFailed: "GENERATION FAILED",
        failedDesc: "We couldn't generate the image for this slide. You can try again or continue without it.",
        ignore: "Ignore",
        regenerate: "Regenerate",
        creatingVisuals: "CREATING VISUALS...",
        addText: "Add Text",
        editTextHint: "Double-click text to edit",
        formatHint: "Select text to show formatting tools",
        backTitle: "Back to Home",
        undo: "Undo",
        redo: "Redo"
    },
    modals: {
        regenerateTitle: "Regenerate Slide Image",
        regenerateDesc: "Edit the visual description below to guide the AI in generating a new background image.",
        generateNewImage: "Generate New Image",
        cancel: "Cancel",
        addSlideTitle: "Add New Slide",
        addSlideDesc: "Describe the content of the new slide. The AI will generate the title, bullet points, and background image for you.",
        createSlide: "Create Slide",
        creating: "Creating...",
        newSlidePlaceholder: "e.g., A slide about the marketing strategy with a focus on social media growth..."
    }
  },
  zh: {
    home: {
      title: "Slide Deck",
      subtitlePrefix: "用",
      subtitleHighlight: "Slide Deck",
      subtitleSuffix: "将您的想法转化为精美的演示文稿",
      placeholder: "描述您的演示文稿想法，或拖入图片、PDF 或音频...",
      dropFiles: "拖放文件到这里...",
      attach: "附件",
      poweredBy: "由 Gemini 驱动",
      history: "历史记录",
      noHistory: "暂无演示文稿。在上方创建您的第一个演示文稿！",
      deletePresentationTitle: "删除演示文稿",
      deletePresentationConfirm: "您确定要删除此演示文稿吗？此操作无法撤销。",
      delete: "删除",
      open: "打开",
      suggestions: [
        "什么是 AI Agent？",
        "一家制造 AI 咖啡机的初创公司的融资演讲稿",
        "如何制作完美的酸面团面包",
        "可再生能源的未来"
      ]
    },
    outline: {
      title: "幻灯片大纲",
      subtitle: "在生成图像之前检查并编辑您的结构。",
      generating: "AI 生成中...",
      parsing: "解析结构中...",
      initializing: "初始化中...",
      parseError: "无法自动解析大纲。请重试或等待生成完成。",
      generateSlides: "生成幻灯片",
      slideLabel: "幻灯片",
      fieldTitle: "标题",
      fieldContent: "内容",
      fieldVisual: "视觉提示词",
      attached: "已附加",
      waitingForTokens: "等待生成..."
    },
    slideShow: {
        slide: "幻灯片",
        of: "/",
        processing: "处理中",
        exportPPTX: "导出 PPTX",
        newSlide: "新幻灯片",
        deleteSlideTitle: "删除幻灯片",
        deleteSlideConfirm: "您确定要删除此幻灯片吗？此操作无法撤销。",
        stopGenerating: "停止生成",
        generationFailed: "生成失败",
        failedDesc: "无法为此幻灯片生成图像。您可以重试或忽略。",
        ignore: "忽略",
        regenerate: "重新生成",
        creatingVisuals: "正在创建视觉效果...",
        addText: "添加文本",
        editTextHint: "双击文本进行编辑",
        formatHint: "选择文本以显示格式工具",
        backTitle: "返回首页",
        undo: "撤销",
        redo: "重做"
    },
    modals: {
        regenerateTitle: "重新生成幻灯片图像",
        regenerateDesc: "编辑下方的视觉描述以引导 AI 生成新的背景图像。",
        generateNewImage: "生成新图像",
        cancel: "取消",
        addSlideTitle: "添加新幻灯片",
        addSlideDesc: "描述新幻灯片的内容。AI 将为您生成标题、要点和背景图像。",
        createSlide: "创建幻灯片",
        creating: "创建中...",
        newSlidePlaceholder: "例如：关于营销策略的幻灯片，重点关注社交媒体增长..."
    }
  }
};