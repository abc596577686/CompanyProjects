import IHeader from '../../components/Header';
import HeaderNavbar from '../../components/HeaderNavbar';
import React from 'react'
import './index.less'
import {DatePicker,Button,Table} from 'antd'
const { RangePicker } = DatePicker;
function TableBox(props){
  const columns = [
    {
      title: '创建时间',
      dataIndex: '1'
    },
    {title: '订单号',dataIndex:'2'},
    {title : '交易类型',dataIndex:'3'},
    {title : '交易方式',dataIndex:'4'},
    {title : '交易金额',dataIndex:'5'},
    {title : '状态',dataIndex:'6'},
    
  ]
  const data = [
    {
      1 : '2018-2020-10-22',
      2 : '123353252414',
      3 : '购买',
      4 : '支付宝',
      5 : '-120',
      6 : '已付款'
    
    },
    {
      1 : '2018-2020-10-22',
      2 : '123353252414',
      3 : '购买',
      4 : '支付宝',
      5 : '-120',
      6 : '已付款'
    
    },
    {
      1 : '2018-2020-10-22',
      2 : '123353252414',
      3 : '购买',
      4 : '支付宝',
      5 : '-120',
      6 : '已付款'
    
    },
    {
      1 : '2018-2020-10-22',
      2 : '123353252414',
      3 : '购买',
      4 : '支付宝',
      5 : '-120',
      6 : '已付款'
    
    }
  ]
  return(
    <div>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  )
}
export default class TradHistory extends React.Component{
  state = {
    chooseData : [
      [
    {
      name : '全部',
      status : '0'
    },
{
  name : '购买',
  status : '1'
},
{
  name : '购买',
    status : '1'
},
{
  name : '购买',
    status : '1'
}
],
      [
  {
    name : '全部',
    status : '0'
  },
  {
    name : '购买',
    status : '1'
  },
  {
    name : '购买',
    status : '1'
  },
  {
    name : '购买',
    status : '1'
  }
],
      [
  {
    name : '全部',
    status : '0'
  },
  {
    name : '购买',
    status : '1'
  },
  {
    name : '购买',
    status : '1'
  },
  {
    name : '购买',
    status : '1'
  }
]
    ]
    
  
  }
   onChange = (date, dateString)=> {
    console.log(date, dateString);
  }
  render(){
    return(
      <div className='trad_container'>
        <IHeader/>
        <HeaderNavbar data='trad'/>
        <div className='trad_content'>
          <div className='trad_header'>
            <div className='search_box'>
              <span>交易时间</span>
              <div className='timeBox' style={{width:'300px'}}>
                <RangePicker size='small' onChange={this.onChange}/>
              </div>
              <Button value='' type='primary'>搜索</Button>
              <Button value=''  type='primary' style={{marginLeft:'10px'}}>导出</Button>
            </div>
            <div className='chooseBox'>
              {
                this.state.chooseData.map((item,index)=>{
                  return(
                    <div key={index} className='box_item'>
                      <span>交易方式</span>
                      <ul className='item'>
                        {item.map((t,i) => {
                          return(
                            <li key={i}>
                              {t.name}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='tableBox'>
            <TableBox/>
          </div>
        
        </div>
        
      </div>
    )
  }
}