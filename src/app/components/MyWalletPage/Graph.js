import React, { Component } from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import { Parser as HtmlToReactParser } from 'html-to-react';
import withLanguageProps from 'HOC/withLanguageProps';

const htmlToReactParser = new HtmlToReactParser();

const dataToPercent = (index, data, state) => {
  var allData = data.datasets[0].data;
  var tooltipLabel = data.labels[index];
  var tooltipData = allData[index];
  var total = 0;
  for (var i in allData) {
    total += allData[i];
  }
  var tooltipPercentage = ((tooltipData / total) * 100).toFixed(1);
  if(state === 0){
      return ' ' + tooltipLabel + '  ' + tooltipPercentage + '%';
  }else{
      return tooltipPercentage + '%';
  }
}

const GRAPH_COLOR = ['#FFFFFF','#C6EAEE','#9BDAE1','#7BCED7','#63C5D0'];

@withLanguageProps
class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphData: []
    };
  }

  componentWillMount() {
    defaults.global.legend.labels.usePointStyle = true;
  }

  componentWillUpdate(nextProps) {
    if(this.props.graphData !== nextProps.graphData && nextProps.graphData.length > 0) {
      const graphData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          borderWidth: []
        }]
      }
      for (let i=0; i<nextProps.graphData.length; i++) {
        graphData['labels'].push(nextProps.graphData[i].type.toUpperCase())
        graphData['datasets'][0].data.push(nextProps.graphData[i].balance);
        graphData['datasets'][0].backgroundColor.push(GRAPH_COLOR[i]);
        graphData['datasets'][0].hoverBackgroundColor.push(GRAPH_COLOR[i]);
        graphData['datasets'][0].borderWidth.push(0);
      }
      this.setState({
        graphData: graphData
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.graphData !== prevProps.graphData && this.props.graphData.length > 0) {
      setTimeout(() => { this.forceUpdate(); }, 800);
    }
	}

  render() {
    const { I18n } = this.props;;

    if (this.props.totalResultLoading || this.state.graphData.length < 1) {
      return (
        <div className="b-group">
          <div style={{width:'306px', height:'340px'}}>
            <ul style={{right: '-81px', bottom: '187px', display: 'inline-block'}}>
              <li style={{width: '138px', textAlign: 'center'}}>
                <span style={{color: 'rgba(255, 255, 255, 0.5)'}} className="label">{I18n.graphNoData}</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }

    return (
      <div className="b-group">
        <div style={{width: '306px', height:'340px'}}>
          <Doughnut
            ref='chart'
            data={this.state.graphData}
            width={340}
            height={340}
            options={{
              layout: {
                  padding: {
                      top: 0,
                      left: 15,
                      right: 22
                  }
              },
              cutoutPercentage: 52.2,
          		maintainAspectRatio: false,
              legend: {
                  display: false
              },
              tooltips: {
          			callbacks: {
          				label: function(tooltipItem, data) {
          					return dataToPercent(tooltipItem.index, data, 0);
          				}
          			}
          		},
              legendCallback: function(chart) {
                let text = [];
                text.push('<div class="container">');
                text.push('<ul style="opacity: 1;">');
                for (let i=0; i<chart.data.datasets[0].data.length; i++) {
                  text.push('<li>');
                  text.push('<span class="li" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
                  text.push('<span class="label">'+ chart.data.labels[i] + '</span>');
                  text.push('<span class="value">'+ dataToPercent(i, chart.data, 1) + '</span>');
                  text.push('</li>');
                }
                text.push('</ul>');
                text.push('</div>');
                return text.join("");
              },
          	}}
            />
          {this.refs.chart && htmlToReactParser.parse((this.refs.chart.chartInstance || this.refs.chart.chart_instance).generateLegend())}
        </div>
      </div>
    );
  }
}

export default Graph;
