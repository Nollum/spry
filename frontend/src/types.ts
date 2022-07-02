// interface BoardComponent (ticket and test inherit from it)

export interface ITicket {
    _id: string;
    title: string;
    description: string;
    status: string;
};

export interface ITest {
    _id: string;
    title: string;
    description: string;
}

export interface ITicketList {
    _id: string;
    title: string;
    tickets: ITicket[];
};

export interface IProject {
    id: string;
    title: string;
    description: string;
    board: ITicketList[];
};


