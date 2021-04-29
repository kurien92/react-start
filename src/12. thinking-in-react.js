import React from 'react';
import ReactDOM from 'react-dom'

const datas = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);

    this.state = {
      filterText: '',
      isStockOnly: false
    }
  }

  handleSearch(filterText) {
    this.setState({filterText});
  }

  handleChangeCheckbox(isStockOnly) {
    this.setState({isStockOnly});
  }

  render() {
    const filterText = this.state.filterText;
    const isStockOnly = this.state.isStockOnly;

    return (
      <div>
        <SearchBar filterText={filterText} isStockOnly={isStockOnly} onSearch={this.handleSearch} onChecked={this.handleChangeCheckbox} />
        <ProductTable filterText={filterText} isStockOnly={isStockOnly} />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleSearch(e) {
    this.props.onSearch(e.target.value);
  }

  handleChecked(e) {
    this.props.onChecked(e.target.checked);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleSearch} defaultValue={this.props.filterText} />
        <br />
        <label><input type="checkbox" onChange={this.handleChecked} defaultChecked={this.props.isStockOnly} /> Only show products in stock</label>
      </div>
    );
  }
}

function ProductTable(props) {
  let products = {};
  let productElements = [];

  let filteredData = datas.filter((data, index) => {
    if(data.name.indexOf(props.filterText) === -1) {
      return false;
    }

    if(props.isStockOnly && (props.isStockOnly !== data.stocked)) {
      return false;
    }
    
    return data;
  });

  for(const data of filteredData) {
    if(products[data.category] === undefined) {
      products[data.category] = [];
    } 

    products[data.category].push(data);
  }

  let keyIndex = 0;
  let key1 = 0;

  for(const i of Object.keys(products)) {
    productElements.push(<ProductCategoryRow key={i} category={i} />);
    productElements.push(<ProductRow key={key1++} keyIndex={keyIndex} products={products[i]} />);
    keyIndex += products[i].length;
  }

  return (<div>
    <ProductTableHeader header={['Name', 'Price']} />
    {productElements}
  </div>);
}

function ProductTableHeader(props) {
  const header = props.header.join(' ');
  
  return (
    <div style={{fontWeight: "bold"}}>{header}</div>
  );
}

function ProductCategoryRow(props) {
  return (
    <div style={{fontWeight: "bold"}}>{props.category}</div>
  );
}

function ProductRow(props) {
  let key = props.keyIndex;

  const productList = props.products.map((i, index) => {

    let style = {
      marginRight: "8px"
    }

    if(!i.stocked) {
      style.color = "red";
      style.fontWeight = "bold";
    }
    
    return (
      <div key={key++}>
        <span style={style}>{i.name}</span>
        <span>{i.price}</span>
      </div>
    );
  });

  return productList;
}

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
)