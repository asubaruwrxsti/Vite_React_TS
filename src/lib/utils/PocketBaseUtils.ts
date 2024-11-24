import { getPocketBase } from "../pocketbase";

export const authRefresh = async () => {
    if (!getPocketBase().authStore.isValid) { return getPocketBase().collection('users').authRefresh(); }
    return;
}