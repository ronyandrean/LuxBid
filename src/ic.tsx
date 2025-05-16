import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "./declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, {
  agent,
  canisterId: backend_id,
});

export default backend;
