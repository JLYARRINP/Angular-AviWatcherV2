export class Ambiente {
    name?: string;
    url?: string;
    subscriptionKey?: string;
    apiKey?: string;     
    projects?: Project[]; 
}
class Project {
    name?: string;
    project?: string;
    channel?: string;
}
