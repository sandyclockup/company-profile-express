/**
 * This file is part of the Sandy Andryanto Company Profile Website.
 *
 * @author     Sandy Andryanto <sandy.andryanto.dev@gmail.com>
 * @copyright  2024
 *
 * For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

import service from './service'

class PageService {

    ping(){
        return service().get("api/page/ping")
    }

    home(){
        return service().get("api/page/home")
    }

    about(){
        return service().get("api/page/about")
    }

    service(){
        return service().get("api/page/service")
    }

    faq(){
        return service().get("api/page/faq")
    }

    contact(){
        return service().get("api/page/contact")
    }

    message(data){
        return service().post("api/page/message", data)
    }

    subscribe(data){
        return service().post("api/page/subscribe", data)
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PageService();

