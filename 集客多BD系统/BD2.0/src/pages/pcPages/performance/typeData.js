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
        title: '记录类型',
        dataIndex: 'recordType',
        key: 'col03',
    },
    {
        title: '注册时间',
        dataIndex: 'registerTime',
        key: 'col04',
    },
    {
        title: '对接人',
        dataIndex: 'bdUserName',
        key: 'col08',
    },
    {
        title: '年限',
        dataIndex: 'number',
        key: 'col05',
    },
    {
        title: '下单时间',
        dataIndex: 'payTime',
        key: 'col06',
        width: 300,
    },
    {
        title: '类型',
        dataIndex: 'bdType',
        key: 'col07',
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