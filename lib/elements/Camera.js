import React from 'react';
import styled from 'styled-components';
import Button from './Button';

let Box = styled.div`
  width:${props => props.width + 'px'};
  margin: 0 auto;
`;

let Canvas = styled.canvas`
  width:${props => props.width + 'px'};
  height:${props => props.height + 'px'};
  background: #000;
  display: block;
`;

export default class Camera extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      ID: 'Camera'
    }
  }

  renderCanvas(video) {
    try {
      let ctx = document.getElementById(this.state.ID).getContext('2d')
      ctx.clearRect(0, 0, 320, 240);

      let safeW, safeH, dw = this.props.width * 1 || 320,
        dh = this.props.height * 1 || 240,
        vw = video.videoWidth,
        vh = video.videoHeight;

      let ratio = 1;
      if (vw / vh > dw / dh) {
        ratio = dw / vw;
      } else if (vw / vh < dw / dh) {
        ratio = dh / vh;
      }
      safeW = vw * ratio;
      safeH = vh * ratio;

      ctx.drawImage(video, 0, 0, vw, vh, (dw - safeW) / 2, (dh - safeH) / 2, safeW, safeH);
      window.requestAnimationFrame(() => {
        this.renderCanvas(video)
      })
    } catch (err) {
      console.log(err)
    }
  }

  canvasToFile(canvas, { fileType = 'image/jpeg', quality = 1.0 }) {
    return new Promise(function (resolve, reject) {
      try {
        let base64 = canvas.toDataURL(fileType, quality);
        let
          arr = base64.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        resolve(new File([u8arr], 'default', { type: mime }));
      } catch (err) {
        reject(err)
      }
    })
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      },
      audio: false,

    }).then(steam => {
      let video = document.createElement('video');
      video.style.width = window.screen.availWidth;
      video.style.height = window.screen.availHeight;

      video.srcObject = steam;
      video.onloadeddata = () => {
        document.body.appendChild(video)
        video.play();
        this.renderCanvas(video);
      }
    }).catch(err => {
      console.error(err)
    })
  }

  render() {

    const component = this;

    return (
      <Box width={this.props.width || '320'} height={this.props.height || '300'}>
        <Canvas id={this.state.ID} width={this.props.width || '320'} height={this.props.height || '240'} />
        <Button onClick={() => {
          try {
            component.canvasToFile(document.getElementById(component.state.ID), {}).then(file => {
              if (component.props.onClick) component.props.onClick(file);
            })
          } catch (err) {
            console.log('等待页面渲染完成');
          }
        }}>拍照查询</Button>
      </Box >
    )
  }
}