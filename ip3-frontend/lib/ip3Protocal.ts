export function getTheNthDayPrice(dayN: number, initialPrice: number) {
  return (initialPrice * (10 - dayN + 1)) / 10
}

export function getFirstNDaysPrice(dayN: number, initialPrice: number) {
  let total = 0
  for (let i = 1; i <= dayN; i++) {
    total += getTheNthDayPrice(i, initialPrice)
  }
  return total.toFixed(2)
}

export function getDurationLineChartData(initialPrice: number) {
  let data = [
    {
      name: '0 day',
      price: 0,
    },
  ]
  for (let i = 1; i <= 10; i++) {
    data.push({
      name: `${i} day${i === 1 ? '' : 's'}`,
      price: Number(getFirstNDaysPrice(i, initialPrice)),
    })
  }
  console.log(data)
  return data
}
