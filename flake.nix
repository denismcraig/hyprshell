{
  description = "Hyprshell";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.astal.follows = "astal";
    };
  };

  outputs =
    inputs@{
      astal,
      ags,
      flake-parts,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        # To import an internal flake module: ./other.nix
        # To import an external flake module:
        #   1. Add foo to inputs
        #   2. Add foo as a parameter to the outputs function
        #   3. Add here: foo.flakeModule
      ];
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      perSystem =
        {
          config,
          lib,
          pkgs,
          system,
          ...
        }:
        let
          packageJson = lib.importJSON ./package.json;
          name = packageJson.name;
          version = packageJson.version;
        in
        {
          packages.default = pkgs.stdenv.mkDerivation {
            inherit name version;
            src = ./.;

            nativeBuildInputs = with pkgs; [
              wrapGAppsHook3
              gobject-introspection
              ags.packages.${system}.default
            ];

            buildInputs = [
              pkgs.glib
              pkgs.gjs
              astal.packages.${system}.io
              astal.packages.${system}.astal4
              astal.packages.${system}.apps
              astal.packages.${system}.auth
              astal.packages.${system}.battery
              astal.packages.${system}.bluetooth
              astal.packages.${system}.hyprland
              astal.packages.${system}.mpris
              astal.packages.${system}.network
              astal.packages.${system}.notifd
              astal.packages.${system}.tray
              astal.packages.${system}.wireplumber
            ];

            buildPhase = ''
              runHook preBuild
              mkdir -p build
              ags bundle ./src/app.ts ./build/${name} \
                --gtk 4 \
                --root ./src \
                --define "DEVEL=false" \
                --define "HYPRSHELL_VERSION='${version}'"
              runHook postBuild
            '';

            installPhase = ''
              runHook preInstall
              mkdir -p $out/bin
              cp -rp ./build/${name} $out/bin/
              runHook postInstall
            '';

            preFixup = ''
              gappsWrapperArgs+=(
                --prefix PATH : ${
                  lib.makeBinPath [
                    # runtime executables
                    pkgs.dart-sass
                    pkgs.glib
                    pkgs.socat
                  ]
                }
              )
            '';
          };

          devShells.default = pkgs.mkShell {
            buildInputs = [
              (ags.packages.${system}.default.override {
                extraPackages = [
                  # cherry pick packages
                ];
              })
            ];

            packages = with pkgs; [
              corepack_24
              nodejs_24
            ];
          };
        };
      flake = {
        passthru = {
          inherit inputs;
        };
      };
    };
}
