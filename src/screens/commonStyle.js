import { StyleSheet } from 'react-native';
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
import { Colors } from '../Theme';

export const commonStyles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#fff',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#0f2537',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: { color: '#fff', fontSize: 28 },
    item: {
        padding: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    title: { fontSize: 16, fontWeight: '600' },
    status: { color: '#666' },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Text
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },

    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#333',
    },

    // Inputs
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },

    // Buttons
    primaryButton: {
        backgroundColor: '#0f2537',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#fff',
        fontWeight: '600',
    },

    dangerButton: {
        backgroundColor: '#E53935',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },

    // Todo List
    listItem: {
        padding: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    statusText: {
        color: '#666',
        marginTop: 4,
    },

    // Floating Button
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#0A66C2',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },

    floatingButtonText: {
        color: '#fff',
        fontSize: 28,
        marginTop: -2,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        marginHorizontal: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    badgePending: {
        backgroundColor: '#FFF4F5',
    },

    badgeCompleted: {
        backgroundColor: '#E6F4EA',
    },

    badgeTextPending: {
        color: '#C77700',
        fontSize: 12,
        fontWeight: '600',
    },

    badgeTextCompleted: {
        color: '#1E8E3E',
        fontSize: 12,
        fontWeight: '600',
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        flex: 1,
        marginRight: 10,
    },

    cardFooter: {
        marginTop: 10,
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    inputContainer: {
        marginBottom: 20,
    },

    statusToggle: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },

    statusOption: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },

    statusActive: {
        backgroundColor: '#0f2537',
    },

    statusText: {
        fontWeight: '600',
    },

    statusTextActive: {
        color: '#fff',
    },
    statusTextInActive: {
        color: Colors.themeColor,
    },

    secondaryButton: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#0f2537',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#0f2537',
        fontWeight: '600',
    },

    detailCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    detailHeader: {
        marginBottom: 16,
    },

    detailTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },

    detailStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },

    dotPending: {
        backgroundColor: '#F9A825',
    },

    dotCompleted: {
        backgroundColor: '#2E7D32',
    },

    detailDivider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },

    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    actionButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },

    editButton: {
        backgroundColor: '#0f2537',
        marginRight: 8,
    },

    deleteButton: {
        backgroundColor: '#E53935',
        marginLeft: 8,
    },
});
