import React from 'react';
import ReactDOM from 'react-dom'

// class FragmentTest extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <ChildA />
//         <ChildB />
//         <ChildC />
//       </React.Fragment>
//     );
//   }
// }

class Table extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <Columns />
          </tr>
        </thead>
      </table>
    )
  }
}

class Columns extends React.Component {
  render() {
    return (
      // 이렇게 사용할 수 없으므로 Fragment를 사용한다.

      //   <div>
      //     <td>Hello</td>
      //     <td>World</td>
      //   </div>
      
      // 기본 값
      // <React.Fragment>
      //   <td>Hello</td>
      //   <td>World</td>
      // </React.Fragment>
      
      // 단축 문법
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    )
  }
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

const items = [
  {id: '1', term: 'term1', description: 'description1'},
  {id: '2', term: 'term2', description: 'description2'},
  {id: '3', term: 'term3', description: 'description3'},
  {id: '4', term: 'term4', description: 'description4'},
  {id: '5', term: 'term5', description: 'description5'}
];

ReactDOM.render(
  <React.Fragment>
    <Table />
    <Glossary items={items}/>
  </React.Fragment>,
  document.getElementById('root')
)