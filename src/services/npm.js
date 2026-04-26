// Downloads API: https://api.npmjs.org/downloads

const REGISTRY_URL = "https://registry.npmjs.org";
const DOWNLOADS_URL = "https://api.npmjs.org/downloads";

export async function fetchPackageInfo(packageName) {
  const [registryRes, downloadsRes] = await Promise.all([
    fetch(`${REGISTRY_URL}/${packageName}/latest`),
    fetch(`${DOWNLOADS_URL}/point/last-week/${packageName}`),
  ]);

  if (!registryRes.ok) throw new Error(`Package "${packageName}" not found`);

  const registry = await registryRes.json();
  const downloads = downloadsRes.ok
    ? await downloadsRes.json()
    : { downloads: 0 };

  return {
    id: packageName,
    name: packageName,
    version: registry.version,
    description: registry.description,
    weeklyDownloads: downloads.downloads,
    url: `https://www.npmjs.com/package/${packageName}`,
  };
}

export async function fetchPackages(packageNames = []) {
  if (packageNames.length === 0) return [];

  const results = await Promise.allSettled(
    packageNames.map((name) => fetchPackageInfo(name)),
  );

  return results.filter((r) => r.status === "fulfilled").map((r) => r.value);
}
