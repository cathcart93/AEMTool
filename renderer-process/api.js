//const {addServer, removeServer, fetchServers, checkStatus} = remote.require("./main-process/api.js");
//const {fetchBundles, startBundle, stopBundle} = remote.require("./main-process/services-api.js");
//
//import {
//    ADD_SERVER_ERROR,
//    NEW_SERVER_ADDED_SUCCESSFULLY,
//    SERVER_REMOVE_ERROR,
//    SERVER_REMOVED_SUCCESSFULLY,
//    SERVERS_FETCHED_ERROR,
//    SERVERS_FETCHED_SUCCESSFULLY,
//    SERVER_STATUS_UPDATED,
//    SERVER_STATUS_UPDATE_ERROR,
//    BUNDLES_FETCHED_SUCCESSFULLY,
//    BUNDLES_FETCH_ERROR,
//    BUNDLE_STARTED_SUCCESSFULLY,
//    BUNDLE_STOPPED_SUCCESSFULLY,
//    BUNDLE_STOP_ERROR,
//    BUNDLE_START_ERROR
//} from "./../common/event-types.js";
//
//import broadcast from "./events-stream.js"
//
//var decorator = (func, {resolve, reject}) => args => {
//   func(args)
//       .then(
//           result => broadcast.next({
//               type: resolve,
//               data: result
//           }),
//           result => broadcast.next({
//               type: reject,
//               data: result
//           })
//       )
//}
//
//const _fetchBundles = decorator(args =>
//    fetchBundles(args)
//        .then(res => {
//            res._id = args;
//            return res;
//        }),
//        {
//            resolve: BUNDLES_FETCHED_SUCCESSFULLY,
//            reject: BUNDLES_FETCH_ERROR
//        });
//
//const _startBundle = decorator(args =>{
//        let {_id, bundleId} = args;
//            console.log(bundleId);
//            return startBundle(_id, bundleId)
//    },
//    {
//        resolve: BUNDLE_STARTED_SUCCESSFULLY,
//        reject: BUNDLE_START_ERROR
//    }
//);
//
//const _stopBundle = decorator(args =>{
//        let {_id, bundleId} = args;
//        console.log(_id, bundleId);
//        return stopBundle(_id, bundleId)
//    },
//    {
//        resolve: BUNDLE_STOPPED_SUCCESSFULLY,
//        reject: BUNDLE_STOP_ERROR
//    }
//);
//
//export default {
//    fetchBundles: _fetchBundles,
//    startBundle: _startBundle,
//    stopBundle: _stopBundle
//}