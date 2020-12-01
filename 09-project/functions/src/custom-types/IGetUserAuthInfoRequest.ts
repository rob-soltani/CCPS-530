import { IIndexable } from '../intefaces/IIndexable';

// export interface IGetUserAuthInfoRequest extends Request {
//     User: {
//         ID: string
//         Email: string,
//         FirstName: string,
//         LastName: string,
//         Token: IIndexable
//     }

// };

declare global {
    namespace Express {
        interface Request {
            User: {
                ID: string,
                Email: string,
                FirstName: string,
                LastName: string,
                Token: IIndexable
            }
        }
    }
}

