export function BadRequestException({
  errMsg = "Bad Request",
  cause = { statusCode: 400 },
} = {}) {
  throw new Error(errMsg, { cause });
}

export function ConflictException({
  errMsg = "Conflict",
  cause = { statusCode: 409 },
} = {}) {
  throw new Error(errMsg, { cause });
}

export function NotFoundException({
  errMsg = "Not Found",
  cause = { statusCode: 404 },
} = {}) {
  throw new Error(errMsg, { cause });
}
