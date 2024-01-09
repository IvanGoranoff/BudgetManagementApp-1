const chartData = {
  height: 480,
  type: 'bar',
  options: {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
      show: true,
      fontSize: '14px',
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    }
  },
  series: [
    {
      name: 'Wants',
      data: [120, 20, 90, 110, 105, 30, 120, 40, 140, 150, 10, 170]
    },
    {
      name: 'Needs',
      data: [200, 180, 170, 190, 210, 230, 220, 210, 200, 195, 190, 185]
    },
    {
      name: 'Income',
      data: [400, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620]
    },
    {
      name: 'Savings',
      data: [180, 240, 270, 290, 250, 215, 200, 180, 170, 100, 50, 140]
    }
  ]
};

export default chartData;
