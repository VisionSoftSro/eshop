import {Navigation} from "./Navigation";
import * as faIcon from "@fortawesome/free-solid-svg-icons";


export const navigation:Navigation = {
    context:"user",
    defaultRoute: "account",
    routes:[
        // {href:"account", component:AccountController, menuConfig:{title:Strings.User, icon:faIcon.faUser}},
        // {href:"starter-pack", component:StarterPackController, menuConfig:{title:Strings.StarterPack, icon:faIcon.faUser}}
    ]
};

export default navigation;