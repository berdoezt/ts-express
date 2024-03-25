interface CustomError {
    code: string
    getCode(): string
}

export class DataNotFoundError extends Error implements CustomError {
    code: string

    constructor(message: string) {
        super(message)
        this.code = "DATA_NOT_FOUND"
    }

    getCode(): string {
        return this.code
    }
}