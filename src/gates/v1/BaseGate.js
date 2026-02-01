
export class BaseGate {

  filterFulfilledResults(results) {
    return results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
  }

  filterRejectedResults(results) {
    return results
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);
  }

  countFulfilled(results) {
    return results.filter((result) => result.status === 'fulfilled').length;
  }

  countRejected(results) {
    return results.filter((result) => result.status === 'rejected').length;
  }
}
