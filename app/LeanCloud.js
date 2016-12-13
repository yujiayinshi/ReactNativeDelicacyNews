/**
 * Created by HuangKai on 2016/12/7.
 */
import AV from 'leancloud-storage';
const APP_ID = '36AQcPNuibGougj9w7peiVos-gzGzoHsz';
const APP_KEY = 'M3uJreGD3EV6oaMH27zVxJFl';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;