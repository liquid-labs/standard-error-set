import { UnavailableError } from '../unavailable-error'

describe('UnavailableError', () => {
  const causeError = new Error()

  test.each([
    [
      undefined,
      /The target resource is currently unavailable./,
      500,
      undefined,
    ],
    [{ target : 'customer db' }, /The customer db is/, 500, undefined],
    [
      { issue : 'off line for maintenance' },
      /is off line for maintenance./,
      500,
      undefined,
    ],
    [
      { expectedTime : 'in 2 hours' },
      /unavailable; try again in 2 hours./,
      500,
      undefined,
    ],
    [{ status : 400 }, /The target resource/, 400, undefined],
    [{ cause : causeError }, /The target resource/, 500, causeError],
    [
      {
        target       : 'customer db',
        issue        : 'off line for maintenance',
        expectedTime : 'after 2:00',
        status       : 400,
        cause        : causeError,
      },
      /The customer db is off line for maintenance; try again after 2:00./,
      400,
      causeError,
    ],
  ])(
    'Options %p => message matches %p, status %s, cause %s',
    (options, messageMatcher, expectedStatus, expectedCause) => {
      const error = new UnavailableError(options)

      expect(error.message).toMatch(messageMatcher)
      expect(error.status).toBe(expectedStatus)
      expect(error.cause).toBe(expectedCause)
    }
  )
})
