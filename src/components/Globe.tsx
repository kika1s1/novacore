import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

const Globe: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        drawGlobe(width, height);
      }
    });

    observer.observe(svgElement);

    let timer: d3.Timer | null = null;

    const drawGlobe = (width: number, height: number) => {
      setLoading(true);
      const minDim = Math.min(width, height);
      const scale = minDim / 2.2;
      const speed = 0.01;

      const projection = d3.geoOrthographic()
        .scale(scale)
        .translate([width / 2, height / 2])
        .clipAngle(90);

      const pathGenerator = d3.geoPath().projection(projection);

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll("*").remove(); // Clear previous render

      const mainGroup = svg.append('g').attr('class', 'globe-glow');

      // Sphere outline
      mainGroup.append('path')
        .datum({ type: 'Sphere' })
        .attr('class', 'sphere')
        .attr('d', (d: any) => pathGenerator(d) as string)
        .style('fill', 'none')
        .style('stroke', 'var(--neon-cyan)')
        .style('stroke-width', 1.5);

      // Graticule (grid lines)
      const graticule = d3.geoGraticule10();
      mainGroup.append('path')
        .datum(graticule)
        .attr('class', 'graticule')
        .attr('d', (d: any) => pathGenerator(d) as string)
        .style('fill', 'none')
        .style('stroke', 'var(--neon-cyan)')
        .style('stroke-width', 0.5)
        .style('stroke-opacity', 0.4);

      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then((world: any) => {
          const land = feature(world, world.objects.countries);

          mainGroup.append('path')
            .datum(land)
            .attr('class', 'land')
            .attr('d', (d: any) => pathGenerator(d) as string)
            .style('fill', 'rgba(0, 255, 255, 0.1)')
            .style('stroke', 'var(--neon-cyan)')
            .style('stroke-width', 0.75);

          if (timer) timer.stop();

          timer = d3.timer((elapsed: number) => {
            const rotate = projection.rotate();
            rotate[0] = speed * elapsed;
            projection.rotate(rotate);
            svg.selectAll('.land, .graticule')
              .attr('d', (d: any) => pathGenerator(d) as string);
          });

          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading or processing map data:", err);
          setLoading(false);
        });
    };

    // Initial draw
    const { width, height } = svgElement.getBoundingClientRect();
    if (width > 0 && height > 0) {
      drawGlobe(width, height);
    }

    return () => {
      if (timer) timer.stop();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--neon-cyan)]">
          <p>Initializing Holo-Projection...</p>
        </div>
      )}
      <svg ref={svgRef} className="w-full h-full" style={{ visibility: loading ? 'hidden' : 'visible' }} />
    </div>
  );
};

export default Globe;
