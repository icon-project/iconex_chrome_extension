import React, { Component } from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import withLanguageProps from 'HOC/withLanguageProps';
import { convertToPercent, checkLength } from 'utils'
import BigNumber from 'bignumber.js';

const GRAPH_COLOR = ['#C6E9ED','#A3DBE2','#85D1D9','#7bd0d8','#5AC0CC','#4CBBC8','#40B6C5'];

@withLanguageProps
class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      selectedElem: -1,
    };
  }

  componentWillMount() {
    defaults.global.legend.labels.usePointStyle = true;
  }

  componentWillUpdate(nextProps) {
    const { data = [] } = nextProps.graphData
    if (this.props.graphData.data !== data && data.length > 0) {
      const graphData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          borderWidth: []
        }]
      }

      for (let i = 0; i < data.length; i++) {
        const { value } = data[i]
        graphData['labels'].push(i)
        graphData['datasets'][0].data.push(value.toString());
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
    const { data: curData = [] } = this.props
    const { data: prevData = [] } = prevProps
    if (curData !== prevData && curData.length > 0) {
      setTimeout(() => { this.forceUpdate(); }, 800);
    }
  }

  render() {
    const { 
      graphData: { 
        data = [],
        etcs = [],
        totalDelegated = new BigNumber(0),
        available = new BigNumber(0), 
      }, 
    } = this.props;
    const { selectedElem } = this.state
    

    if (this.props.totalResultLoading || this.state.graphData.length < 1) {
      return (
        <div className="b-group"></div>
      )
    }

    const total = totalDelegated.plus(available)

    return (
      <div className="b-group">
        <div style={{ width: '305px', height: '340px' }}>
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
                enabled: false,
                custom: (tooltipModel) => {
                  const { body } = tooltipModel
                  const _selectedElem = body ? Number(body[0].lines[0].split(":")[0]) : -1
                  if (selectedElem !== _selectedElem) {
                    this.setState({
                      selectedElem: _selectedElem
                    })
                  }
                },
              },
            }}
          />
          <div className="c-group">
            <div style={{ width: '305px', height: '340px' }}>
            {
              selectedElem < 0 ? (
                <DefaultGraphToolTips 
                  totalDelegated={totalDelegated}
                  available={available} 
                  total={total} />
              ) : (
                <GraphToolTips
                  data={data}
                  etcs={etcs}
                  total={total}
                  selectedElem={selectedElem}
                 />
              )
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DefaultGraphToolTips = ({ totalDelegated, available, total }) => {
  const totalDelegatedPct = convertToPercent(totalDelegated, total, 1)
  const availablePct = convertToPercent(available, total, 1)
  if (totalDelegatedPct === '0.0' || totalDelegatedPct === '100.0') {
    return (
      <ul style={{ right: '-81px', bottom: '187px', display: 'inline-block' }}>
        <li style={{ width: '138px', textAlign: 'center' }}>
          <span style={{ paddingTop: '30px' }} className="graph-center-num label">{totalDelegatedPct}%</span>
        </li>
        <li style={{width: '138px', textAlign: 'center'}}>
          <span style={{ fontSize: '10px' }} className="graph-center-num label">Voted</span>
        </li>
      </ul>
    )
  } else {
    return (
      <ul style={{ right: '-81px', bottom: '187px', display: 'inline-block' }}>
        <li className="small a">
          <span className="graph-center-num small-num">{totalDelegatedPct}<em>%</em></span>
          <span className="graph-center-num small-label">Voted</span>
        </li>
        <li className="diagonal"></li>
        <li className="small b">
          <span className="graph-center-num small-num">{availablePct}<em>%</em></span>
          <span className="graph-center-num small-label">Available</span>
        </li>
      </ul>
    )
  }
}

const GraphToolTips = ({
  data,
  etcs,
  total,
  selectedElem,
}) => {
  const { name, value } = data[selectedElem]
  if (data[selectedElem].name !== 'etc') {
    const valuePct = convertToPercent(value, total, 1)
    const nameText = checkLength(name) > 18 ? name.substring(0, 18) + '...' : name;
    return (
      <ul style={{ right: '-81px', bottom: '187px', display: 'inline-block' }}>
        <li style={{width: '138px', textAlign: 'center'}}>
          <span style={{ paddingTop: '10px', fontSize: '10px' }} className="graph-center-num label">
            {nameText}
          </span>
        </li>
        <li style={{ paddingTop: '0px', width: '138px', textAlign: 'center' }}>
          <span className="graph-center-num label">{valuePct}%</span>
        </li>
      </ul>
    )
  } else {
    return (
      <ul style={{ right: '-81px', bottom: '187px', display: 'inline-block' }}>
        <div className="container">
          <ul>
            {
              etcs.map(({ name, value }, i) => {
                const nameText = checkLength(name) > 7 ? name.substring(0, 7) + '...' : name;
                const valuePct = convertToPercent(value, total, 1)
                return (
                  <li key={i}>
                    <span className="label">{nameText}</span>
                    <span style={{ marginTop: 2 }} className="value">{valuePct}%</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </ul>
    )
  }
}


export default Graph;
