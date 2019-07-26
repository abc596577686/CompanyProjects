import React from 'react';
import { ERR_OK, baseUrl } from "../../../axios/config";

export const mockTableData = [
    {
        title: '商品主图',
        dataIndex: 'imageURL',
        key: 'col01',
        width: 100,
    },
    {
        title: '分类名称',
        dataIndex: 'name',
        key: 'col02',
        width: 100,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'col04',
        width: 50,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        key: 'col05',
        width: 50,
    },
    {
        title: '分类标签',
        dataIndex: 'tagNames',
        key: 'col08',
        width: 100,
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'col010',
        width: 100,
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'col013',
    }
]

export const mocklist = [
    {
        title: '商品主图',
        dataIndex: 'imageURL',
        key: 'col01',
        render: (text, score) => {
            return (
                <img src={baseUrl + score.imagePath} alt="" style={{ width: '30px', height: '30px' }} />
            )
        }
    },
    {
        title: '分类名称',
        dataIndex: 'name',
        key: 'col02',
        width: 100,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'col04',
        width: 50,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        key: 'col05',
        width: 50,
    },
    {
        title: '分类标签',
        dataIndex: 'tagNames',
        key: 'col08',
        width: 100,
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'col010',
        width: 100,
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'col013',
        // render: (text, score) => {
            // return (
                //<span>
                    // {/* <a href="javascript:;" onClick={this.productAction(this, score, 'del')} >删除</a> */}
                    // {/* <a href="javascript:;" onClick={this.productAction.bind(this, score, 'edit')} style={{ marginLeft: '2px' }}>编辑</a> */}
                    // {/* <a href="javascript:;" onClick={this.productAction.bind(this, score, 'open')} style={{ marginLeft: '2px' }}>启用</a> */}
                    // {/* <a href="javascript:;" onClick={this.productAction.bind(this, score, 'close')} style={{ marginLeft: '2px' }}>禁用</a> */}
                // </span>
            // )
        // }
    }
]