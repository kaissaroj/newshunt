/**
 * Created by kais on 1/16/15.
 */
renderTemplate = function renderTemplate(template, data) {
  var node = document.createElement("div");
  document.body.appendChild(node);
  UI.renderWithData(template, data, node);
  return node;
};
