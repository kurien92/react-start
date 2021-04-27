import ReactDOM from 'react-dom'

const numbers = [1,2,3,4,5];
// const doubled = numbers.map((number) => number * 2);
// console.log(doubled);

// const listItems = numbers.map((number) => 
//   <li>{number}</li>
// );

// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) => 
//     <li key={number.toString()}>{number}</li>
//   );

//   return (
//     <ul>{listItems}</ul>
//   );
// }

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map((post) => {
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
    />
  });

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

function Post(props) {
  return <div key={props.id}>
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
}

function NumberList(props) {
  const numbers = props.numbers;

  return (
    <ul>
      {numbers.map((number) => 
        <ListItem
          key={number.toString()}
          value={number}
        />
      )}
    </ul>
  )
}

function ListItem(props) {
  return <li
    key={props.key}>
    {props.value}
  </li>
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
]

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
)