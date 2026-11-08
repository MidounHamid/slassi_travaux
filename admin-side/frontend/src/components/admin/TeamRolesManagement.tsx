"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  KeyRound,
  Check,
  X,
  Edit2,
  Trash2,
  Plus,
  Lock,
  Building2,
  HardHat,
  Truck,
  Calculator,
  FileText,
  AlertCircle,
  Sparkles,
  RefreshCw,
  UserCheck,
  FolderLock,
  Layers,
} from "lucide-react";
import { api, AuthUser, ApiRole, ApiTeamMember, ApiPermission } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

interface TeamRolesManagementProps {
  currentUser: AuthUser | null;
  onRefreshUser?: () => void;
}

export function TeamRolesManagement({ currentUser, onRefreshUser }: TeamRolesManagementProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"roles" | "team" | "matrix" | "permissions">("roles");
  const [roles, setRoles] = useState<ApiRole[]>([]);
  const [teamMembers, setTeamMembers] = useState<ApiTeamMember[]>([]);
  const [allPermissions, setAllPermissions] = useState<ApiPermission[]>([]);
  const [permissionsGrouped, setPermissionsGrouped] = useState<Record<string, ApiPermission[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // User Role Edit Modal State
  const [editingMember, setEditingMember] = useState<ApiTeamMember | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  // Role Create / Edit Modal State
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<ApiRole | null>(null);
  const [roleForm, setRoleForm] = useState({
    name: "",
    label_fr: "",
    label_ar: "",
    description: "",
    permissions: [] as number[],
  });

  // Permission Create / Edit Modal State
  const [permModalOpen, setPermModalOpen] = useState(false);
  const [editingPerm, setEditingPerm] = useState<ApiPermission | null>(null);
  const [permForm, setPermForm] = useState({
    name: "",
    label_fr: "",
    label_ar: "",
    module: "projects",
  });

  const [saving, setSaving] = useState(false);
  const isSuperAdmin = currentUser?.role === "super_admin";

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [rolesData, usersData, permsData] = await Promise.all([
        api.getRoles(),
        api.getTeamMembers(),
        api.getPermissions(),
      ]);
      setRoles(rolesData);
      setTeamMembers(usersData);
      setPermissionsGrouped(permsData.groups);
      setAllPermissions(permsData.list);
    } catch (err: any) {
      console.error("Failed loading roles & team:", err);
      setError(
        language === "ar"
          ? "تعذر تحميل بيانات الأدوار والصلاحيات من الخادم."
          : language === "en"
          ? "Failed to load roles and permissions from server."
          : "Impossible de charger les rôles et permissions depuis le serveur."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // -------------------------------------------------------------
  // LOCALIZATION HELPERS
  // -------------------------------------------------------------
  const getRoleLabel = (role: ApiRole | { name: string; label_fr: string; label_ar?: string }) => {
    if (language === "ar") {
      if (role.label_ar) return role.label_ar;
      if (role.name === "super_admin") return "المدير العام (مسؤول النظام)";
      if (role.name === "project_manager") return "مدير مشاريع البناء";
      if (role.name === "fleet_manager") return "مسؤول أسطول الآليات والمعدات";
      if (role.name === "commercial") return "المكلف بالشؤون التجارية والتقديرات";
    }
    if (language === "en") {
      if (role.name === "super_admin") return "General Director (Super Admin)";
      if (role.name === "project_manager") return "BTP Project Manager";
      if (role.name === "fleet_manager") return "Fleet & Machinery Manager";
      if (role.name === "commercial") return "Sales & Estimator Specialist";
    }
    return role.label_fr;
  };

  const getRoleDescription = (role: ApiRole) => {
    if (language === "ar") {
      if (role.name === "super_admin")
        return "الوصول الكامل وغير المقيد لكافة الأقسام، الإعدادات القانونية وإدارة المستخدمين.";
      if (role.name === "project_manager")
        return "إدارة الأوراش الميدانية، متابعة نسب الإنجاز وجاهزية آليات البناء.";
      if (role.name === "fleet_manager")
        return "إدارة أسطول الآليات الثقيلة، التوزيع على الأوراش ومتابعة الصيانة.";
      if (role.name === "commercial")
        return "استقبال ودراسة طلبات التقديرات، التواصل مع الزبائن وإعداد عروض الأسعار.";
    }
    if (language === "en") {
      if (role.name === "super_admin")
        return "Full and unrestricted access to all modules, corporate records, and access control.";
      if (role.name === "project_manager")
        return "Complete management of construction sites, work progress, and machinery monitoring.";
      if (role.name === "fleet_manager")
        return "Full fleet management of excavators, loaders, trucks, and site maintenance.";
      if (role.name === "commercial")
        return "Handling of quote inquiries, client relationships, and cost estimation bids.";
    }
    return role.description || (language === "ar" ? "لا يوجد وصف مدخل." : language === "en" ? "No description provided." : "Aucune description renseignée.");
  };

  const getModuleName = (mod: string) => {
    switch (mod.toLowerCase()) {
      case "projects":
        return language === "ar"
          ? "المشاريع والأوراش"
          : language === "en"
          ? "Projects & Sites"
          : "Chantiers & Projets";
      case "machinery":
        return language === "ar"
          ? "أسطول الآليات والمعدات"
          : language === "en"
          ? "Machinery Fleet"
          : "Parc d'Engins & Matériel";
      case "quotes":
        return language === "ar"
          ? "طلبات عروض الأسعار"
          : language === "en"
          ? "Quotes & Inquiries"
          : "Devis & Estimations";
      case "pages":
        return language === "ar"
          ? "صفحات الموقع وإدارتها"
          : language === "en"
          ? "CMS & Website Pages"
          : "CMS & Pages";
      case "settings":
        return language === "ar"
          ? "البيانات القانونية للمقاولة"
          : language === "en"
          ? "Corporate Legal Entity"
          : "Identité Juridique";
      case "users":
        return language === "ar"
          ? "المستخدمون والوصول"
          : language === "en"
          ? "Users & Team Access"
          : "Utilisateurs & Équipe";
      default:
        return mod;
    }
  };

  const getPermLabel = (perm: ApiPermission) => {
    if (language === "ar") {
      if (perm.label_ar) return perm.label_ar;
      const arMap: Record<string, string> = {
        "projects.view": "معاينة المشاريع والأوراش",
        "projects.create": "إضافة ورش بناء جديد",
        "projects.edit": "تعديل بيانات الورش ونسب الإنجاز",
        "projects.delete": "حذف ورش من النظام",
        "machinery.view": "معاينة أسطول الآليات والمعدات",
        "machinery.create": "إضافة آلية جديدة للأسطول",
        "machinery.edit": "تحديث حالة التشغيل والصيانة",
        "machinery.delete": "إخراج آلية من الأسطول",
        "quotes.view": "معاينة طلبات عروض الأسعار",
        "quotes.edit": "معالجة وتحيين حالة التقدير",
        "quotes.delete": "حذف طلب تقدير",
        "pages.view": "معاينة شجرة صفحات الموقع",
        "pages.create": "إنشاء صفحات جديدة",
        "pages.edit": "تعديل قوالب وتصاميم الصفحات",
        "pages.delete": "حذف صفحات من الموقع",
        "settings.view": "معاينة بيانات وهوية المقاولة",
        "settings.edit": "تعديل رأس المال والسجل التجاري",
        "users.view": "معاينة قائمة الفريق والصلاحيات",
        "users.manage": "إنشاء وتعديل صلاحيات المستخدمين",
      };
      return arMap[perm.name] || perm.label_fr;
    }
    if (language === "en") {
      const enMap: Record<string, string> = {
        "projects.view": "View construction projects & sites",
        "projects.create": "Create new construction project",
        "projects.edit": "Edit project data & completion progress",
        "projects.delete": "Delete a project",
        "machinery.view": "View heavy machinery fleet",
        "machinery.create": "Add new machine to inventory",
        "machinery.edit": "Update machine site status & maintenance",
        "machinery.delete": "Remove machine from fleet",
        "quotes.view": "View customer quote inquiries",
        "quotes.edit": "Process and update quote status",
        "quotes.delete": "Delete quote request",
        "pages.view": "View site page hierarchy",
        "pages.create": "Create new website pages",
        "pages.edit": "Edit page layouts & content",
        "pages.delete": "Delete website pages",
        "settings.view": "View corporate identity records",
        "settings.edit": "Edit capital, RC, ICE and contact details",
        "users.view": "View team members & roles",
        "users.manage": "Manage user accounts & permissions",
      };
      return enMap[perm.name] || perm.label_fr;
    }
    return perm.label_fr;
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case "super_admin":
        return {
          icon: "👑",
          label: language === "ar" ? "المدير العام" : language === "en" ? "Super Admin" : "Super Admin",
          color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        };
      case "project_manager":
        return {
          icon: "🏗️",
          label: language === "ar" ? "مدير المشاريع" : language === "en" ? "Project Manager" : "Chef de Projet",
          color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        };
      case "fleet_manager":
        return {
          icon: "🚜",
          label: language === "ar" ? "مسؤول الآليات" : language === "en" ? "Fleet Manager" : "Resp. Parc",
          color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        };
      case "commercial":
        return {
          icon: "💼",
          label: language === "ar" ? "تجاري وعروض" : language === "en" ? "Commercial & Sales" : "Commercial",
          color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        };
      default:
        return {
          icon: "🛡️",
          label: roleName,
          color: "bg-slate-700/50 text-slate-300 border-slate-600",
        };
    }
  };

  // -------------------------------------------------------------
  // USER ROLE ASSIGNMENT
  // -------------------------------------------------------------
  const handleOpenEditUser = (member: ApiTeamMember) => {
    setEditingMember(member);
    setSelectedRoleId(member.role_id || 1);
    setSelectedJobTitle(member.job_title);
  };

  const handleSaveUserRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !selectedRoleId) return;

    try {
      setSaving(true);
      await api.updateUserRole(editingMember.id, selectedRoleId, selectedJobTitle);
      showToast(
        language === "ar"
          ? `تم تحديث دور ${editingMember.name} بنجاح.`
          : language === "en"
          ? `Role for ${editingMember.name} updated successfully.`
          : `Rôle de ${editingMember.name} mis à jour avec succès.`
      );
      setEditingMember(null);
      await loadData();
      if (onRefreshUser && editingMember.id === currentUser?.id) {
        onRefreshUser();
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de la modification du rôle.");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------------------------------------
  // ROLES CRUD
  // -------------------------------------------------------------
  const handleOpenCreateRole = () => {
    setEditingRole(null);
    setRoleForm({
      name: "",
      label_fr: "",
      label_ar: "",
      description: "",
      permissions: [],
    });
    setRoleModalOpen(true);
  };

  const handleOpenEditRole = (role: ApiRole) => {
    setEditingRole(role);
    setRoleForm({
      name: role.name,
      label_fr: role.label_fr,
      label_ar: role.label_ar || "",
      description: role.description || "",
      permissions: role.permissions.map((p) => p.id),
    });
    setRoleModalOpen(true);
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleForm.label_fr) {
      setError(language === "ar" ? "اسم الدور بالفرنسية مطلوب." : "Le libellé français est obligatoire.");
      return;
    }

    try {
      setSaving(true);
      if (editingRole) {
        await api.updateRole(editingRole.id, {
          label_fr: roleForm.label_fr,
          label_ar: roleForm.label_ar,
          description: roleForm.description,
          permissions: roleForm.permissions,
        });
        showToast(
          language === "ar"
            ? `تم تحديث الدور بنجاح.`
            : language === "en"
            ? `Role updated successfully.`
            : `Rôle '${roleForm.label_fr}' modifié avec succès.`
        );
      } else {
        await api.createRole({
          name: roleForm.name,
          label_fr: roleForm.label_fr,
          label_ar: roleForm.label_ar,
          description: roleForm.description,
          permissions: roleForm.permissions,
        });
        showToast(
          language === "ar"
            ? `تم إنشاء الدور الجديد بنجاح.`
            : language === "en"
            ? `New role created successfully.`
            : `Nouveau rôle '${roleForm.label_fr}' créé avec succès.`
        );
      }
      setRoleModalOpen(false);
      await loadData();
      if (onRefreshUser) onRefreshUser();
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'enregistrement du rôle.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRole = async (role: ApiRole) => {
    if (role.is_system && role.name === "super_admin") {
      alert(
        language === "ar"
          ? "دور المدير العام محمي ولا يمكن حذفه."
          : language === "en"
          ? "Super Admin role is protected and cannot be deleted."
          : "Le rôle Super Administrateur est protégé et ne peut être supprimé."
      );
      return;
    }

    const confirmMsg =
      language === "ar"
        ? `هل أنت متأكد من حذف هذا الدور نهائياً؟`
        : language === "en"
        ? `Are you sure you want to permanently delete this role?`
        : `Êtes-vous sûr de vouloir supprimer définitivement le rôle '${role.label_fr}' ?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      setSaving(true);
      await api.deleteRole(role.id);
      showToast(language === "ar" ? "تم حذف الدور بنجاح." : language === "en" ? "Role deleted." : `Le rôle '${role.label_fr}' a été supprimé.`);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression du rôle.");
    } finally {
      setSaving(false);
    }
  };

  const toggleRolePermission = (permId: number) => {
    setRoleForm((prev) => {
      const exists = prev.permissions.includes(permId);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((id) => id !== permId)
          : [...prev.permissions, permId],
      };
    });
  };

  const toggleModulePermissions = (modulePerms: ApiPermission[]) => {
    const moduleIds = modulePerms.map((p) => p.id);
    const allSelected = moduleIds.every((id) => roleForm.permissions.includes(id));

    setRoleForm((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((id) => !moduleIds.includes(id))
        : Array.from(new Set([...prev.permissions, ...moduleIds])),
    }));
  };

  // -------------------------------------------------------------
  // PERMISSIONS CRUD
  // -------------------------------------------------------------
  const handleOpenCreatePerm = () => {
    setEditingPerm(null);
    setPermForm({
      name: "",
      label_fr: "",
      label_ar: "",
      module: "projects",
    });
    setPermModalOpen(true);
  };

  const handleOpenEditPerm = (perm: ApiPermission) => {
    setEditingPerm(perm);
    setPermForm({
      name: perm.name,
      label_fr: perm.label_fr,
      label_ar: perm.label_ar || "",
      module: perm.module,
    });
    setPermModalOpen(true);
  };

  const handleSavePerm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!permForm.label_fr || (!editingPerm && !permForm.name)) {
      setError("Veuillez renseigner les champs obligatoires de la permission.");
      return;
    }

    try {
      setSaving(true);
      if (editingPerm) {
        await api.updatePermission(editingPerm.id, {
          label_fr: permForm.label_fr,
          label_ar: permForm.label_ar,
          module: permForm.module,
        });
        showToast(language === "ar" ? "تم تحديث الصلاحية بنجاح." : "Permission mise à jour avec succès.");
      } else {
        await api.createPermission({
          name: permForm.name,
          label_fr: permForm.label_fr,
          label_ar: permForm.label_ar,
          module: permForm.module,
        });
        showToast(language === "ar" ? "تم إنشاء الصلاحية بنجاح." : `Permission '${permForm.name}' créée avec succès.`);
      }
      setPermModalOpen(false);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'enregistrement de la permission.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePerm = async (perm: ApiPermission) => {
    if (!window.confirm(language === "ar" ? `حذف الصلاحية نهائياً؟` : `Supprimer définitivement la permission '${perm.name}' ?`)) return;

    try {
      setSaving(true);
      await api.deletePermission(perm.id);
      showToast(language === "ar" ? "تم حذف الصلاحية بنجاح." : `Permission '${perm.name}' supprimée.`);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border border-slate-800 p-6 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t("roles_badge_sec")}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {t("roles_main_title")}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {t("roles_subtitle")}
            </p>
          </div>

          {/* Action Buttons & Current User Role */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {isSuperAdmin && (
              <>
                <button
                  type="button"
                  onClick={handleOpenCreateRole}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center space-x-1.5 rtl:space-x-reverse shadow-md shadow-amber-500/20 cursor-pointer transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t("btn_new_role")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenCreatePerm}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer transition-all"
                >
                  <Plus className="h-3.5 w-3.5 text-amber-400" />
                  <span>{t("btn_new_perm")}</span>
                </button>
              </>
            )}

            <button
              onClick={loadData}
              disabled={loading}
              title="Rafraîchir"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-6 pt-4 border-t border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("roles")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap ${
              activeTab === "roles"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FolderLock className="h-4 w-4" />
            <span>
              {t("tab_roles_mgmt")} ({roles.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap ${
              activeTab === "team"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>
              {t("tab_team_members")} ({teamMembers.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap ${
              activeTab === "permissions"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <KeyRound className="h-4 w-4" />
            <span>
              {t("tab_perm_catalog")} ({allPermissions.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap ${
              activeTab === "matrix"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>{t("tab_global_matrix")}</span>
          </button>
        </div>
      </div>

      {/* Toast and Error notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2.5 rtl:space-x-reverse text-emerald-300 text-xs animate-in slide-in-from-top-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-red-300 text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-white font-bold ml-2 rtl:ml-0 rtl:mr-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* TAB 1: ROLES MANAGEMENT (ADD, EDIT, DELETE) */}
      {activeTab === "roles" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const badge = getRoleBadge(role.name);
              const isSuper = role.name === "super_admin";

              return (
                <div
                  key={role.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold">
                          {badge.icon}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <h3 className="font-bold text-sm text-white">
                              {getRoleLabel(role)}
                            </h3>
                            {role.is_system && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                {t("lbl_system_badge")}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-amber-400/90 mt-0.5">
                            {role.name}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.8 rounded-lg border ${badge.color}`}
                      >
                        {role.users_count} {t("lbl_role_members")}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      {getRoleDescription(role)}
                    </p>

                    {/* Permissions preview tag list */}
                    <div className="mt-3.5 pt-3 border-t border-slate-800/80">
                      <div className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                        <span>{t("lbl_permissions_associated")}</span>
                        <span className="text-amber-400 font-bold">
                          {isSuper
                            ? t("lbl_all_access")
                            : `${role.permissions.length} ${t("lbl_permissions_granted")}`}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {isSuper ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                            👑 {t("lbl_all_access")}
                          </span>
                        ) : role.permissions.length > 0 ? (
                          role.permissions.slice(0, 6).map((p) => (
                            <span
                              key={p.id}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                            >
                              {p.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-500 italic">
                            {language === "ar"
                              ? "لا توجد صلاحيات مخصصة."
                              : language === "en"
                              ? "No permissions granted yet."
                              : "Aucune permission accordée pour l'instant."}
                          </span>
                        )}
                        {!isSuper && role.permissions.length > 6 && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            +{role.permissions.length - 6} {language === "ar" ? "أخرى" : language === "en" ? "more" : "autres"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Role Card Actions (Edit, Delete) */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      ID: #{role.id}
                    </span>

                    {isSuperAdmin && (
                      <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                        <button
                          type="button"
                          onClick={() => handleOpenEditRole(role)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1 rtl:space-x-reverse transition-colors cursor-pointer"
                        >
                          <Edit2 className="h-3 w-3" />
                          <span>{t("btn_edit")}</span>
                        </button>

                        {!isSuper && (
                          <button
                            type="button"
                            onClick={() => handleDeleteRole(role)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-semibold flex items-center space-x-1 rtl:space-x-reverse transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>{t("btn_delete")}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TEAM MEMBERS */}
      {activeTab === "team" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => {
              const badge = getRoleBadge(member.role);
              const isCurrentUser = member.id === currentUser?.id;

              return (
                <div
                  key={member.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCurrentUser
                      ? "bg-gradient-to-br from-slate-900 to-[#10192e] border-amber-500/40 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <h3 className="font-bold text-sm text-white">{member.name}</h3>
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {language === "ar" ? "أنت" : language === "en" ? "You" : "Vous"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{member.job_title}</p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{member.email}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.8 rounded-lg border ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px]">{t("lbl_active_account")}</span>
                      <span>•</span>
                      <span className="text-[11px] text-slate-500">
                        {member.permissions_count} {t("lbl_permissions_granted")}
                      </span>
                    </div>

                    {isSuperAdmin && (
                      <button
                        onClick={() => handleOpenEditUser(member)}
                        className="inline-flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-semibold border border-slate-700 hover:border-amber-500/40 transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>{t("btn_change_role")}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PERMISSIONS CATALOG (ADD, EDIT, DELETE) */}
      {activeTab === "permissions" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">{t("perm_catalog_title")}</h3>
                <p className="text-[11px] text-slate-400">
                  {t("perm_catalog_subtitle")}
                </p>
              </div>
              {isSuperAdmin && (
                <button
                  type="button"
                  onClick={handleOpenCreatePerm}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center space-x-1.5 rtl:space-x-reverse shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{t("btn_add_perm")}</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-800/80 mt-2">
              {Object.entries(permissionsGrouped).map(([moduleName, perms]) => (
                <div key={moduleName} className="py-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {getModuleName(moduleName)}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({perms.length} {language === "ar" ? "صلاحيات" : language === "en" ? "permissions" : "permissions"})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {perms.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between group hover:border-slate-700 transition-all"
                      >
                        <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                          <div className="font-semibold text-xs text-slate-200 truncate">
                            {getPermLabel(p)}
                          </div>
                          <div className="font-mono text-[10px] text-slate-400 truncate mt-0.5">
                            {p.name}
                          </div>
                        </div>

                        {isSuperAdmin && (
                          <div className="flex items-center space-x-1 rtl:space-x-reverse shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleOpenEditPerm(p)}
                              title={t("btn_edit")}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 cursor-pointer"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePerm(p)}
                              title={t("btn_delete")}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GLOBAL MATRIX */}
      {activeTab === "matrix" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{t("lbl_matrix_title")}</h3>
              <p className="text-[11px] text-slate-400">
                {t("lbl_matrix_subtitle")}
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400">
              {roles.length} {language === "ar" ? "أدوار" : language === "en" ? "Roles" : "Rôles"} • {allPermissions.length} {language === "ar" ? "صلاحيات" : language === "en" ? "Permissions" : "Permissions"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-semibold w-1/3">{t("lbl_module_label")}</th>
                  {roles.map((r) => (
                    <th key={r.id} className="py-3 px-3 font-semibold text-center whitespace-nowrap">
                      {getRoleLabel(r)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {Object.entries(permissionsGrouped).map(([moduleName, perms]) => (
                  <React.Fragment key={moduleName}>
                    <tr className="bg-slate-950/50">
                      <td
                        colSpan={roles.length + 1}
                        className="py-2 px-4 font-bold text-amber-400 text-[11px] uppercase tracking-wider"
                      >
                        {getModuleName(moduleName)}
                      </td>
                    </tr>
                    {perms.map((perm) => (
                      <tr key={perm.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 text-slate-300">
                          <div className="font-medium text-slate-200">{getPermLabel(perm)}</div>
                          <div className="font-mono text-[10px] text-slate-400">{perm.name}</div>
                        </td>
                        {roles.map((r) => {
                          const hasIt =
                            r.name === "super_admin" ||
                            r.permissions.some((p) => p.id === perm.id);

                          return (
                            <td key={r.id} className="py-2.5 px-3 text-center">
                              {hasIt ? (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400">
                                  <Check className="h-3.5 w-3.5" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800/50 text-slate-600">
                                  <X className="h-3.5 w-3.5" />
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: CREATE OR EDIT ROLE */}
      {/* ========================================================= */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0e172a] border border-slate-700 p-6 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <FolderLock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingRole
                      ? language === "ar"
                        ? `تعديل الدور '${getRoleLabel(editingRole)}'`
                        : `Modifier le Rôle '${editingRole.label_fr}'`
                      : language === "ar"
                      ? "إنشاء دور جديد في المنظومة"
                      : "Créer un Nouveau Rôle BTP"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar"
                      ? "حدد صلاحيات الوصول والمسؤوليات لهذا الملف الشخصي"
                      : "Définissez les droits d'accès et les attributions pour ce profil"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 rtl:pr-0 rtl:pl-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === "ar" ? "الاسم (بالفرنسية / اللاتينية) *" : "Libellé Français *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={roleForm.label_fr}
                    onChange={(e) => setRoleForm({ ...roleForm, label_fr: e.target.value })}
                    placeholder="Ex: Ingénieur Travaux & Suivi"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === "ar" ? "الاسم باللغة العربية" : "Libellé Arabe"}
                  </label>
                  <input
                    type="text"
                    value={roleForm.label_ar}
                    onChange={(e) => setRoleForm({ ...roleForm, label_ar: e.target.value })}
                    placeholder="مثال: مهندس أشغال وتتبع ميداني"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === "ar" ? "وصف ومسؤوليات الدور" : "Description du Rôle"}
                </label>
                <textarea
                  rows={2}
                  value={roleForm.description}
                  onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                  placeholder={language === "ar" ? "حدد المهام والصلاحيات المخولة لهذا الدور..." : "Décrivez les responsabilités et les accès autorisés..."}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Permissions Checklist Grouped by Module */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-amber-400">
                    {language === "ar"
                      ? `الصلاحيات المحددة (${roleForm.permissions.length} مختارة)`
                      : `Permissions Attribuées (${roleForm.permissions.length} sélectionnée(s))`}
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {language === "ar" ? "اختر الصلاحيات المسموحة" : "Cochez les actions autorisées"}
                  </span>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  {Object.entries(permissionsGrouped).map(([moduleName, perms]) => {
                    const moduleIds = perms.map((p) => p.id);
                    const allChecked = moduleIds.every((id) => roleForm.permissions.includes(id));

                    return (
                      <div key={moduleName} className="pb-2 border-b border-slate-800/60 last:border-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                            {getModuleName(moduleName)}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleModulePermissions(perms)}
                            className="text-[10px] font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                          >
                            {allChecked ? t("lbl_deselect_all") : t("lbl_select_all")}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {perms.map((p) => {
                            const isChecked = roleForm.permissions.includes(p.id);
                            return (
                              <label
                                key={p.id}
                                className={`flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg border cursor-pointer transition-colors ${
                                  isChecked
                                    ? "bg-amber-500/15 border-amber-500/40 text-amber-200"
                                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleRolePermission(p.id)}
                                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                                />
                                <div className="min-w-0 text-left rtl:text-right">
                                  <div className="text-[11px] font-medium truncate">{getPermLabel(p)}</div>
                                  <div className="text-[9px] font-mono text-slate-400 truncate">{p.name}</div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 cursor-pointer"
                >
                  {t("btn_cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  {saving
                    ? language === "ar"
                      ? "جاري الحفظ..."
                      : "Enregistrement..."
                    : editingRole
                    ? language === "ar"
                      ? "حفظ التعديلات"
                      : "Mettre à jour le Rôle"
                    : language === "ar"
                    ? "إنشاء الدور"
                    : "Créer le Rôle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: CREATE OR EDIT PERMISSION */}
      {/* ========================================================= */}
      {permModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0e172a] border border-slate-700 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {editingPerm
                      ? language === "ar"
                        ? "تعديل الصلاحية"
                        : "Modifier la Permission"
                      : language === "ar"
                      ? "إضافة صلاحية جديدة"
                      : "Nouvelle Permission"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === "ar"
                      ? "تحديد امتياز وظيفي محدد"
                      : "Définir un droit d'accès unitaire"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPermModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSavePerm} className="mt-4 space-y-3.5">
              {!editingPerm && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === "ar" ? "رمز الصلاحية الفريد (مثال: projects.export) *" : "Code Système Unique *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={permForm.name}
                    onChange={(e) => setPermForm({ ...permForm, name: e.target.value })}
                    placeholder="module.action (ex: fleet.export)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === "ar" ? "الوصف بالفرنسية *" : "Libellé Français Explicatif *"}
                </label>
                <input
                  type="text"
                  required
                  value={permForm.label_fr}
                  onChange={(e) => setPermForm({ ...permForm, label_fr: e.target.value })}
                  placeholder="Ex: Exporter les rapports de chantiers en PDF"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === "ar" ? "الوصف باللغة العربية" : "Libellé Arabe"}
                </label>
                <input
                  type="text"
                  value={permForm.label_ar}
                  onChange={(e) => setPermForm({ ...permForm, label_ar: e.target.value })}
                  placeholder="مثال: تصدير تقارير الأوراش بصيغة PDF"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === "ar" ? "القسم الميداني *" : "Module Applicatif *"}
                </label>
                <select
                  value={permForm.module}
                  onChange={(e) => setPermForm({ ...permForm, module: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="projects">
                    {language === "ar" ? "الأوراش والمشاريع (projects)" : "Chantiers & Projets (projects)"}
                  </option>
                  <option value="machinery">
                    {language === "ar" ? "الآليات والمعدات (machinery)" : "Parc d'Engins (machinery)"}
                  </option>
                  <option value="quotes">
                    {language === "ar" ? "التقديرات والأسعار (quotes)" : "Devis & Estimations (quotes)"}
                  </option>
                  <option value="pages">
                    {language === "ar" ? "صفحات الموقع (pages)" : "CMS & Pages (pages)"}
                  </option>
                  <option value="settings">
                    {language === "ar" ? "بيانات المقاولة (settings)" : "Informations Juridiques (settings)"}
                  </option>
                  <option value="users">
                    {language === "ar" ? "المستخدمون والوصول (users)" : "Utilisateurs & Accès (users)"}
                  </option>
                  <option value="general">
                    {language === "ar" ? "عام (general)" : "Général (general)"}
                  </option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setPermModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 cursor-pointer"
                >
                  {t("btn_cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 cursor-pointer"
                >
                  {saving
                    ? language === "ar"
                      ? "جاري الحفظ..."
                      : "Enregistrement..."
                    : editingPerm
                    ? t("btn_apply")
                    : t("btn_add_perm")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ASSIGN USER ROLE */}
      {/* ========================================================= */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0e172a] border border-slate-700 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {language === "ar" ? "تغيير دور العضو" : "Changer le Rôle d'un Collaborateur"}
                  </h3>
                  <p className="text-xs text-slate-400">{editingMember.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingMember(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUserRole} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {language === "ar" ? "الدور المعين في النظام" : "Rôle Système Attribué"}
                </label>
                <select
                  value={selectedRoleId || ""}
                  onChange={(e) => setSelectedRoleId(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {getRoleLabel(r)} ({r.name})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  {language === "ar"
                    ? "سيتم تطبيق كافة امتيازات وصلاحيات هذا الدور على الحساب."
                    : "Toutes les permissions du rôle seront appliquées au collaborateur."}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {language === "ar" ? "المسمى الوظيفي" : "Poste Professionnel"}
                </label>
                <input
                  type="text"
                  value={selectedJobTitle}
                  onChange={(e) => setSelectedJobTitle(e.target.value)}
                  placeholder="Ex: Conducteur de Travaux Principal"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 cursor-pointer"
                >
                  {t("btn_cancel")}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  {saving ? (language === "ar" ? "جاري التطبيق..." : "Enregistrement...") : t("btn_apply")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
