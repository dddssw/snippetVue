import { highlightCode, consoleInfo } from "../utils/printCode";
export const devProblem = {
    "Failed to connect to github.com port 443 after 24277 ms: Couldn't connect to server":()=>{
        const list = [
          "git config --global http.proxy 127.0.0.1:7890",
          "git config --global https.proxy 127.0.0.1:7890",
        ];
        consoleInfo(
          list,
          "Failed to connect to github.com port 443 after 24277 ms"
        );
    }
}