import React from 'react';
import ReactDOM from 'react-dom'

// const EnhancedComponent = higherOrderComponent(WrappedComponent);
const DataSource = {
  getBlogPost: function(id) {
    return 11 + " / " + id;
  },
  getComments: function() {
    return [{
      id: 1,
      text: "text1"
    }, {
      id: 2,
      text: "text2"
    }];
  },
  addChangeListener: function(handleChange) {
    console.log("addChangeListener", handleChange);
  },
  removeChangeListener: function(handleChange) {
    console.log("removeChangeListener", handleChange);
  }
}

class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource"는 글로벌 데이터 소스입니다.
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // 변화감지를 위해 리스너를 추가합니다.
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // 리스너를 제거합니다.
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // 데이터 소스가 변경될 때 마다 comments를 업데이트 합니다.
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

function Comment(props) {
  return <div className="comment">[{props.comment.id}] {props.comment.text}</div>
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />
  }
}

function TextBlock(props) {
  return <div>{props.text}</div>;
}

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

// 이 함수는 컴포넌트를 매개변수로 받고...
function withSubscription(WrappedComponent, selectData) {
  // ...다른 컴포넌트를 반환하는데...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...구독을 담당하고...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ...래핑된 컴포넌트를 새로운 데이터로 렌더링 합니다!
      // 컴포넌트에 추가로 props를 내려주는 것에 주목하세요.
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

ReactDOM.render(
  <React.Fragment>
    <BlogPostWithSubscription id="111" />
    <CommentListWithSubscription />
  </React.Fragment>,
  document.getElementById('root')
)