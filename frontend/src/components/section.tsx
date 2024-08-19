import type { SectionInterface } from "../interface/SectionInterface";

export default function Section( prop: SectionInterface) {
    return <div>{prop.name}</div>;
}