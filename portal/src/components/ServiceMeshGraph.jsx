```jsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export const ServiceMeshGraph = ({ services, nodes, quantumMode = false }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!services.length || !nodes.length) return;

    const width = containerRef.current.clientWidth;
    const height = 400;

    // Limpa SVG anterior
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Cria força de simulação
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Cria nós (combina serviços e nós)
    const allNodes = [
      ...nodes.map(node => ({ ...node, type: 'node' })),
      ...services.map(service => ({ ...service, type: 'service' }))
    ];

    // Cria links baseados em serviços nos nós
    const links = [];
    services.forEach(service => {
      nodes.forEach(node => {
        if (Math.random() > 0.7) { // Simula conexão
          links.push({
            source: service.id,
            target: node.id,
            strength: Math.random()
          });
        }
      });
    });

    // Desenha links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', quantumMode ? '#9b59b6' : '#3498db')
      .attr('stroke-width', d => d.strength * 3)
      .attr('stroke-opacity', 0.6)
      .attr('class', 'service-link');

    // Desenha nós
    const node = svg.append('g')
      .selectAll('g')
      .data(allNodes)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Adiciona círculos aos nós
    node.append('circle')
      .attr('r', d => d.type === 'node' ? 12 : 8)
      .attr('fill', d => {
        if (d.type === 'node') {
          return d.status === 'alive' ? '#2ecc71' : '#e74c3c';
        } else {
          return d.status === 'healthy' ? '#3498db' : 
                 d.status === 'warning' ? '#f39c12' : '#e74c3c';
        }
      })
      .attr('stroke', quantumMode ? '#9b59b6' : '#fff')
      .attr('stroke-width', quantumMode ? 2 : 1);

    // Adiciona labels
    node.append('text')
      .text(d => d.name.length > 15 ? d.name.substring(0, 12) + '...' : d.name)
      .attr('x', 15)
      .attr('y', 3)
      .attr('font-size', '10px')
      .attr('fill', quantumMode ? '#ecf0f1' : '#2c3e50');

    // Efeito quântico de pulsação
    if (quantumMode) {
      node.selectAll('circle')
        .transition()
        .duration(2000)
        .attr('r', d => d.type === 'node' ? 15 : 10)
        .transition()
        .duration(2000)
        .attr('r', d => d.type === 'node' ? 12 : 8)
        .on('end', function repeat() {
          d3.select(this)
            .transition()
            .duration(2000)
            .attr('r', d => d.type === 'node' ? 15 : 10)
            .transition()
            .duration(2000)
            .attr('r', d => d.type === 'node' ? 12 : 8)
            .on('end', repeat);
        });
    }

    // Atualiza simulação
    simulation.nodes(allNodes).on('tick', ticked);
    simulation.force('link').links(links);

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [services, nodes, quantumMode]);

  return (
    <div ref={containerRef} className="service-mesh-graph-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};
```