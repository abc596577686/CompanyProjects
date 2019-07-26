import React from 'react';

export const mockTableData = [
    {
        title: '账号',
        dataIndex: 'mobile',
        key: 'col01',
        width: 80,
    },
    {
        title: '姓名',
        dataIndex: 'userName',
        key: 'col02',
    },
    {
        title: '渠道',
        dataIndex: 'channelName',
        key: 'col03',
    },
    {
        title: '从属',
        dataIndex: 'regionTeamName',
        key: 'col04',
    },
    {
        title: '客户姓名',
        dataIndex: 'customerName',
        key: 'col05',
        width: 300,
    },
    {
        title: '客户联系方式',
        dataIndex: 'customerMobile',
        key: 'col06',
        width: 300,
    },
    {
        title: '拜访时间',
        dataIndex: 'createTime',
        key: 'col07',
    },
    {
        title: '拜访地址',
        dataIndex: 'address',
        key: 'col08',
        width:200,
    },
    {
        title: '拜访记录',
        dataIndex: 'content',
        key: 'col09',
        width: 300,
    }
]

// export const mocklist = [
//     {
//         title: '商品主图',
//         dataIndex: 'imageURL',
//         key: 'col01',
//         render: (text, score) => {
//             return (
//                 <img src={baseUrl + score.imagePath} alt="" style={{ width: '30px', height: '30px' }} />
//             )
//         }
//     },
//     {
//         title: '分类名称',
//         dataIndex: 'name',
//         key: 'col02',
//         width: 100,
//     },
//     {
//         title: '状态',
//         dataIndex: 'status',
//         key: 'col04',
//         width: 50,
//     },
//     {
//         title: '排序',
//         dataIndex: 'sort',
//         key: 'col05',
//         width: 50,
//     },
//     {
//         title: '分类标签',
//         dataIndex: 'tagNames',
//         key: 'col08',
//         width: 100,
//     },
//     {
//         title: '创建时间',
//         dataIndex: 'createTime',
//         key: 'col010',
//         width: 100,
//     },
//     {
//         title: '操作',
//         dataIndex: 'action',
//         key: 'col013',
//     }
// ]