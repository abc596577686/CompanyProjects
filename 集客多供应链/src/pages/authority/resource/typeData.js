import React from 'react';
import { ERR_OK, baseUrl } from "../../../axios/config";

export const mockTableData = [
    {
        title: '资源序号',
        dataIndex: 'resourceId',
        key: 'col01',
        width: 20,
    },
    {
        title: '资源组别',
        dataIndex: 'groupName',
        key: 'col02',
        width: 20,
    },
  
    {
        title: '操作',
        dataIndex: 'edit',
        key: 'col05',
        width: 20,
    },
]
export const mockTableDatas = [
    {
        title: '资源名称',
        dataIndex: 'name',
        key: 'col01',
        width: 100,
    },
    {
        title: '资源组别',
        dataIndex: 'groupName',
        key: 'col02',
        width: 100,
    },
    {
        title: '资源链接',
        dataIndex: 'linkPath',
        key: 'col03',
        width: 200,
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'col04',
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
    }
]

export const goodsTableColumns = [
    // {
    //     title: '资源id',
    //     dataIndex: 'resourceId',
    //     key: 'col20',
    //     width: 100,
    // },
    {
        title: '资源名称',
        dataIndex: 'name',
        key: 'col21',
    },
    {
        title: '资源链接',
        dataIndex: 'linkPath',
        key: 'col22',
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'col23',
        width: 100
    }
]