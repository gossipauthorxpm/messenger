import {Path} from "@/app/paths";


export default function useNamePath(pathName: string, paths: Path[]) {
    for (const path of paths) {
        if(path.path === pathName) return path.name;
    }
    throw new Error(`${pathName} is not in useNamePath`);
}