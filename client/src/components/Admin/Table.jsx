import React, { Component } from 'react';
import './assets/css/Table.css';
import ReactOverflowTooltip from 'react-overflow-tooltip';
class Table extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      list: []
    };
    this.truncateText = this.truncateText.bind(this);
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    fetch("/product/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ list: json.list });
        console.log(this.state.list);
      });
      this.handleCheck = this.handleCheck.bind(this);
     
  }
  handleCheck(event) {
    if (!window.confirm("R U SURE"))
      event.target.checked = !event.target.checked;
      
    this.setState({checked: event.target.checked});
    //console.log("After " + event.target.checked);
  }
  truncateText(string) {
    if (string.length > 45) {
      return string.substr(0, 45) + ".".repeat(140);
    }
    else {
      return string;
    }
  }

	render() {
		const tableStyle = {
			"vertical-align": "middle",
			"text-align": "center"
    }
    const arr = this.state.list;
		return (
    <div className="col-md-12">
        <div className="card table-with-switches" style={tableStyle}>
          <div className="card-header ">
            <h4 className="card-title">Danh sách sản phẩm</h4>
          </div>
          <div className="card-body table-full-width">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Tên sản phẩm</th>
                  <th>Loại</th>
                  <th className="text-center">Miêu tả</th>
                  <th className="text-center">Giao hàng</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {
                  arr.map((item, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center longtext" >
                        <ReactOverflowTooltip title={item.productName}>
                          <div>{this.truncateText(item.productName)}</div>
                        </ReactOverflowTooltip>
                      </td>
                      <td className="text-center">{item.productType}</td>
                      <td className="text-center longtext" >{item.description}</td>
                      <td className="text-center">
                        <label class="switch">
                          <input type="checkbox" onChange={this.handleCheck} on />
                          <span class="slider round"></span>
                        </label>
                      </td>
                      <td className="td-actions text-center">
                        <button className="btn btn-danger" tooltip="Xóa" tooltip-position="buttom"><i className="nc-icon nc-simple-remove"></i></button>
                        <button className="btn btn-success" tooltip="Sửa" tooltip-position="buttom"><i className="nc-icon nc-settings-tool-66"></i></button>
                      </td>
                    </tr>
                  ))
                }
               
              </tbody>
            </table>
          </div>
        </div>
    </div>);
	}
}

export default Table;