<template>
    <div class='lg:grid grid-cols-3 gap-2 my-2'>
        <DetailsCard class='row-span-2 col-span-2' v-for="item in List" :key="item.doc_id" :Info="item" />
        <blockquote v-if='ListData?.length > 0'>
            <Card Title='最新资源' :ListData='ListData' @onTarget='onTarget' />
        </blockquote>
    </div>
</template>
<script setup>
const Route = useRoute()
const router = useRouter()

import QRCode from 'qrcode'
const List = ref([])
const ListData = ref([])
const FromCloud = {
    page: 1,
    page_size: 10,
}
const onTarget = ({ doc_id }) => {
    console.log('获取详情', doc_id)
    GetDetails(doc_id)
}
const GetUpdate = async () => {
    console.log(useQueryString(FromCloud))
    const { results } = await useCloud(useQueryString(FromCloud))
    // const { results } = {
    //     "code": 20000,
    //     "data": [
    //         "oB8VR5OzuCVqKTJi+b8J/g=="
    //     ],
    //     "message": "执行成功",
    //     "results": [
    //         {
    //             "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
    //             "disk_id": "923a3ef09aca",
    //             "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
    //             "disk_pass": "",
    //             "disk_type": "QUARK",
    //             "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
    //             "share_user": "蝴***师",
    //             "shared_time": "2024-01-03T15:25:33+00:00",
    //             "extensions": [
    //                 {
    //                     "extension": "epub"
    //                 },
    //                 {
    //                     "extension": "mobi"
    //                 }
    //             ],
    //             "highlight": {
    //                 "disk_name": [
    //                     "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
    //                 ],
    //                 "files": [
    //                     "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
    //                 ]
    //             }
    //         },
    //     ],
    //     "count": 5,
    //     "previous": null,
    //     "next": "http://localhost:8000/api/v1/cloud/resource/?ordering=-shared_time&page=2&page_size=1&search=%E5%91%A8%E6%98%9F%E9%A9%B0"
    // }
    ListData.value = results
}

const GetDetails = async (Id) => {
    const { results } = await useCloud(`doc_id=${Id}`)
    // const { results } = {
    //     "code": 20000,
    //     "data": [
    //         "oB8VR5OzuCVqKTJi+b8J/g=="
    //     ],
    //     "message": "执行成功",
    //     "results": [
    //         {
    //             "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
    //             "disk_id": "923a3ef09aca",
    //             "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
    //             "disk_pass": "",
    //             "disk_type": "QUARK",
    //             "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
    //             "share_user": "蝴***师",
    //             "shared_time": "2024-01-03T15:25:33+00:00",
    //             "extensions": [
    //                 {
    //                     "extension": "epub"
    //                 },
    //                 {
    //                     "extension": "mobi"
    //                 }
    //             ],
    //             "highlight": {
    //                 "disk_name": [
    //                     "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
    //                 ],
    //                 "files": [
    //                     "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
    //                 ]
    //             }
    //         },
    //     ],
    //     "count": 5,
    //     "previous": null,
    //     "next": "http://localhost:8000/api/v1/cloud/resource/?ordering=-shared_time&page=2&page_size=1&search=%E5%91%A8%E6%98%9F%E9%A9%B0"
    // }
    List.value = results
}

const onSearch = (value) => {
    router.push({ path: "/", query: { search: value } })
}
onMounted(async () => {
    const { doc_id } = Route.query
    GetDetails(doc_id)
    GetUpdate()
    useEventBus.on('onSearch', onSearch)
    onUnmounted(() => {
        useEventBus.events['onSearch'] = useEventBus.events['onSearch'].filter(callback => callback !== onSearch);
    });
})
</script>
<style scoped></style>
