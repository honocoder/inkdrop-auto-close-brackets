module.exports = {
  activate() {
    global.inkdrop.onEditorLoad(this.handleEditorInit.bind(this));
  },

  deactivate() {},

  handleEditorInit(editor) {
    const cm = editor.cm;

    cm.on('keypress', (cm, event) => {
      const char = String.fromCharCode(event.keyCode);
      const { line, ch } = cm.getCursor();
      const lineContent = cm.getLine(line);

      if (char === '(' || char === '{' || char === '[') {
        event.preventDefault();

        const matchingBracket = this.getMatchingBracket(char);
        const nextChar = lineContent[ch];

        if (nextChar === matchingBracket) {
          cm.setCursor({ line, ch: ch });
        } else {
          cm.replaceRange(char + matchingBracket, { line, ch }, { line, ch });
          cm.setCursor({ line, ch: ch + 1 });
        }
      }
    });
  },

  getMatchingBracket(bracket) {
    if (bracket === '(') return ')';
    if (bracket === '{') return '}';
    if (bracket === '[') return ']';
    return '';
  },
};
