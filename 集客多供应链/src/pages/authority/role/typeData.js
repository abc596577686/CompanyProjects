import React from 'react';
import { ERR_OK, baseUrl } from "../../../axios/config";

export const mockTableData = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'col01',
        width: 100,
    },
    {
        title: '备注',
        dataIndex: 'description',
        key: 'col02',
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
    }
]