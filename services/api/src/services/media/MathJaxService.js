import mjAPI from 'mathjax-node';

mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  },
});
mjAPI.start();

export const MathJaxService = {

  generate: (expression, callback) => {
    mjAPI.typeset({
      math: expression,
      format: 'AsciiMath', // or "inline-TeX", "MathML"
      svg: true, // or svg:true, or html:true
    }, callback);
  }

};
