// Reference-observer photometric accounting, NOT a renderer or a spectral decomposition.
// Inputs must share passband, zero point, epoch, observer and extinction convention.
// A child magnitude includes its entire complex (gas + associated stars).
// Deliberately not imported by the cockpit until spatial/spectral transfer is validated.
function finite(value, label) {
  if (!Number.isFinite(value)) throw new TypeError(`${label} must be finite`);
  return value;
}
function weight(value, label) {
  finite(value, label);
  if (value < 0 || value > 1) throw new RangeError(`${label} must be in [0,1]`);
  return value;
}

/** Partition one inclusive host flux, normalised to 1, into disjoint children.
 * resolved: fraction of a child's reference flux explicitly rendered, NOT visibility.
 * When culled/unavailable it must be 0, so the host retains that child's allocation.
 * hostVolume: existing point-to-volume interpolation, independently in [0,1].
 * All children must be immediate, mutually disjoint members of this host.
 */
export function partitionEmission({hostId, hostMagnitude, children = [], hostVolume = 1}) {
  if (typeof hostId !== 'string' || !hostId) throw new TypeError('hostId required');
  finite(hostMagnitude, 'hostMagnitude');
  weight(hostVolume, 'hostVolume');
  const ids = new Set([hostId]);
  let allocated = 0, full = 0;
  const allocations = children.map(child => {
    if (typeof child.id !== 'string' || !child.id || ids.has(child.id)) throw new Error('Duplicate or invalid child id');
    if (child.hostId !== hostId) throw new Error(`Wrong host for ${child.id}`);
    ids.add(child.id);
    finite(child.magnitude, 'child magnitude');
    const resolved = weight(child.resolved ?? 0, 'resolved');
    const fraction = 10 ** (-0.4 * (child.magnitude - hostMagnitude));
    if (!Number.isFinite(fraction) || fraction <= 0) throw new RangeError('Unrepresentable flux ratio');
    full += fraction;
    const flux = fraction * resolved;
    allocated += flux;
    return {id: child.id, fraction, resolved, flux};
  });
  // Do not silently clamp inconsistent magnitudes or overlapping catalogue apertures.
  if (full > 1) throw new RangeError('Children exceed inclusive host flux');
  const host = 1 - allocated;
  return {hostId, host, hostPoint: host * (1 - hostVolume), hostVolume: host * hostVolume,
    children: allocations, fullChildFraction: full, allocatedChildFraction: allocated,
    // Potential over-count if the *full* host is kept and these children are added.
    naiveFlux: 1 + allocated, naiveMagnitudeShift: -2.5 * Math.log10(1 + allocated),
    total: host + allocated};
}
