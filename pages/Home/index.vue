<template>
  <div class='flex  gap-2.5 py-2.5'>
    <Select :SelectList='NetdiscType' @onChange='onNetdiscType' />
    <Select :Multiple='true' :SelectList='NetdiscType.slice(1)' @onChange='onMultipleType' />
    <Select :SelectList='SortType' @onChange='onSort' />
  </div>
  <div class='font-black tracking-wider text-black text-lg py-2.5'><em>{{ Netdisc }}</em>为您提供<em>搜索内容</em>
    搜索结果<em>{{ Count }}</em>条</div>
  <div class='flex flex-col gap-2.5 '>
    <ListItem v-for="item in List" :key="item.doc_id" :Info="item" @click='onDetail(item)' />
  </div>
  <div ref='Loading' class='text-center py-5'>
    <i v-if="IsLoading" class='text-3xl ' style='font-size: 1.875rem;'>
      <FontAwesomeIcon :icon='faSpinner' pulse />
    </i>
  </div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Route = useRoute()
const router = useRouter()
const Netdisc = ref('所有网盘')
const Count = ref(0)
const NetdiscType = ref([
  {
    SelectType: 'All',
    SelectName: '所有网盘'
  },
  {
    SelectType: 'baidu',
    SelectName: '百度云盘'
  },
  {
    SelectType: 'quark',
    SelectName: '夸克网盘'
  },
  {
    SelectType: 'aly',
    SelectName: '阿里云盘'
  },
  {
    SelectType: 'xunlei',
    SelectName: '迅雷网盘'
  },
  {
    SelectType: 'UC',
    SelectName: 'UC   网盘'
  },
])
const SortType = ref([
  {
    SelectType: 'shared_time',
    SelectName: '升序'
  },
  {
    SelectType: '-shared_time',
    SelectName: '降序'
  }
])
const List = ref([])
const Loading = ref(null)
let IsLoading = ref(false)


let FromCloud = {
  page: 1,
  page_size: 10,
  search: [],
  doc_id: [],
  ordering: 'shared_time',
  doc_id__: {
    prefix: '',
    contains: '',
    exclude: '',
  },
  shared_time__: {
    range: '',
    gt: '',
    gte: '',
    lt: '',
    lte: '',
  },
  disk_type: '',
  disk_name__wildcard: '',
  disk_type__in: '',
}
const GetData = async () => {
  IsLoading.value = false
  console.log(useQueryString(FromCloud))
  const { results, count } = await useCloud(useQueryString(FromCloud))
  // const { results, count } = {
  //   "code": 20000,
  //   "data": [
  //     "oB8VR5OzuCVqKTJi+b8J/g=="
  //   ],
  //   "message": "执行成功",
  //   "results": [
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //     {
  //       "doc_id": "9f73e3cb-28a1-4d8d-be9d-3aa24daae244",
  //       "disk_id": "923a3ef09aca",
  //       "disk_name": "周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "disk_pass": "",
  //       "disk_type": "QUARK",
  //       "files": "file:周星驰映画 - 师永刚,刘琼雄.mobi",
  //       "share_user": "蝴***师",
  //       "shared_time": "2024-01-03T15:25:33+00:00",
  //       "extensions": [
  //         {
  //           "extension": "epub"
  //         },
  //         {
  //           "extension": "mobi"
  //         }
  //       ],
  //       "highlight": {
  //         "disk_name": [
  //           "<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ],
  //         "files": [
  //           "file:<em>周星驰</em>映画 - 师永刚,刘琼雄.mobi"
  //         ]
  //       }
  //     },
  //   ],
  //   "count": 5,
  //   "previous": null,
  //   "next": "http://localhost:8000/api/v1/cloud/resource/?ordering=-shared_time&page=2&page_size=1&search=%E5%91%A8%E6%98%9F%E9%A9%B0"
  // }
  Count.value = count;
  if (FromCloud.page == 1) {
    List.value = []
  }
  if (results.length === FromCloud.page_size) {
    FromCloud.page++
  }
  IsLoading.value = results.length === FromCloud.page_size
  List.value.push(...results)
}
const onNetdiscType = ({ SelectName, SelectType }) => {
  Netdisc.value = SelectName
  FromCloud.page = 1
  FromCloud.disk_type = SelectType === 'All' ? '' : SelectType
  GetData()
}
const onMultipleType = (TypeObj) => {
  let Key = []
  for (const key in TypeObj) {
    Key.push(key)
  }
  FromCloud.page = 1
  FromCloud.disk_type__in = Key.join('__')
  GetData()
}
const onSort = ({ SelectName, SelectType }) => {
  FromCloud.page = 1
  FromCloud.ordering = SelectType
  GetData()
}
const onDetail = ({ doc_id }) => {
  router.push({ path: "/Details", query: { doc_id } })
}
const onSearch = (value) => {
  FromCloud.page = 1
  FromCloud.search = [value]
  GetData()
}
onMounted(() => {
  const { search } = Route.query
  FromCloud.search = [search]
  GetData()
  useEventBus.on('onSearch', onSearch)
  let ob = new IntersectionObserver((entries, observer) => {
    entries.forEach(element => {
      IsLoading.value && element.isIntersecting && GetData()
    });
  })
  Loading.value && ob.observe(Loading.value)
  onUnmounted(() => {
    console.log('清空')
    ob = null
    useEventBus.events['onSearch'] = useEventBus.events['onSearch'].filter(callback => callback !== onSearch);
  })
})
</script>
<style scoped></style>
