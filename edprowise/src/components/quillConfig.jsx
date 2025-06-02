// quillConfig.js
import Quill from "quill";

// const Font = Quill.import('formats/font');
const FontStyle = Quill.import("attributors/style/font");
const Size = Quill.import("attributors/style/size");
const AlignStyle = Quill.import("attributors/style/align");
// --- Custom Indent using style (instead of class) ---
const Parchment = Quill.import("parchment");

// Define which fonts you want to allow
const fontMap = [
  { name: "sans-serif", value: "sans-serif" },
  { name: "arial", value: "Arial, sans-serif" },
  { name: "calibri", value: "Calibri, sans-serif" },
  { name: "comic-sans-ms", value: "Comic Sans MS, cursive, sans-serif" },
  { name: "courier-new", value: "Courier New, Courier, monospace" },
  { name: "georgia", value: "Georgia, serif" },
  { name: "helvetica", value: "Helvetica, Arial, sans-serif" },
  { name: "impact", value: "Impact, Charcoal, sans-serif" },
  { name: "lucida-console", value: "Lucida Console, Monaco, monospace" },
  { name: "tahoma", value: "Tahoma, Geneva, sans-serif" },
  { name: "times-new-roman", value: "Times New Roman, Times, serif" },
  { name: "trebuchet-ms", value: "Trebuchet MS, Helvetica, sans-serif" },
  { name: "verdana", value: "Verdana, Geneva, sans-serif" },
  { name: "serif", value: "serif" },
  { name: "monospace", value: "monospace" },
];

class IndentAttributor extends Parchment.StyleAttributor {
  add(node, value) {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || intValue < 0 || intValue > 8) {
      return false; // reject invalid or out-of-bound values
    }

    if (intValue === 0) {
      this.remove(node);
      return true;
    }

    return super.add(node, `${intValue * 3}em`);
  }

  value(node) {
    const val = super.value(node);
    if (!val) return 0;

    const px = parseFloat(val);
    const level = Math.round(px / 3);

    if (isNaN(level) || level < 0) return 0;
    return Math.min(level, 8); // cap value to 8
  }
}

const IndentStyle = new IndentAttributor("indent", "padding-left", {
  scope: Parchment.Scope.BLOCK,
});
Quill.register(IndentStyle, true);

// Configure FontStyle whitelist with just the simple names
FontStyle.whitelist = fontMap.map((font) => font.value);
Quill.register(FontStyle, true);

Size.whitelist = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "28px",
  "36px",
  "48px",
  "72px",
];
Quill.register(Size, true);

AlignStyle.whitelist = ["right", "center", "justify"];
Quill.register(AlignStyle, true);

// ===== TOOLBAR CONFIGURATION =====
export const getModules = (handlers = {}) => ({
  toolbar: {
    container: [
      [
        {
          font: fontMap.map((font) => font.value),
        },
      ],
      [{ size: Size.whitelist }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: AlignStyle.whitelist.concat([""]) }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    handlers: {
      link: function (value) {
        if (value) {
          const url = prompt("Enter the URL:");
          if (url) {
            const text = prompt("Enter link text:", "");
            const quill = this.quill;
            const range = quill.getSelection();
            if (range) {
              if (text) {
                quill.insertText(range.index, text, "link", url);
              } else {
                quill.format("link", url);
              }
            }
          }
        } else {
          this.quill.format("link", false);
        }
      },
    },
  },
  clipboard: {
    matchVisual: true,
  },
});

const FontFormat = {
  name: "font",
  format: (value) => {
    const font = fontMap.find((f) => f.name === value);
    return font ? font.value : value;
  },
  parse: (value) => {
    const font = fontMap.find((f) => f.value === value);
    return font ? font.name : value;
  },
};

Quill.register(FontFormat, true);

// ===== FORMATS SUPPORTED =====
export const formats = [
  "font",
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
];

// ===== CSS STYLES FOR FONTS =====
export const fontStyles = `
.ql-font-sans-serif {
  font-family: Tinos, sans-serif;
}

.ql-font span[data-value="false"]::before {
  content: "Normal" ;
}
`;

//  'image', 'video', 'attachment'
