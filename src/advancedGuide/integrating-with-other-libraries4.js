import ReactDOM from 'react-dom';
import Backbone from 'backbone';

function Paragraph(props) {
  return <p>{props.text}</p>
}

const ParagraphView = Backbone.View.extend({
  render() {
    const text = this.model.get('text');
    ReactDOM.render(<Paragraph text={text} />, this.el);
    return this;
  },
  remove() {
    ReactDOM.unmountComponentAtNode(this.el);
    Backbone.View.prototype.remove.call(this);
  }
});

const model = new Backbone.Model({ text: 'React works with Backbone!' });
const view = new ParagraphView({ model, el: "#root" });
view.render();

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// )